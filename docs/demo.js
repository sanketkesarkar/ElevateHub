'use strict';

// A browser model of ElevateHub. Endpoints, bodies and queries mirror
// backend/routes/*.js. "Current build" reproduces the repository's behavior:
// Add to Dashboard POSTs a full copy of the course to /course/add.
// "Proposed fix" models an Enrollment collection and a JWT on each request.

const USERS = {
  user: { _id: '6650a1c2e4b0', fullName: 'Alex Rivera', initials: 'AR' },
  instructor: { _id: '6650a1c2f7d9', fullName: 'Maya Chen', initials: 'MC' }
};

const SEED = [
  { title: 'Master React Basics', description: 'Components, props, state and hooks, built up one small app at a time.', price: 49, theme: 'react', icon: '⚛',
    videos: ['Your first component', 'State and events', 'Effects and data fetching'] },
  { title: 'Introduction to Python', description: 'Variables to functions, with short exercises after every lesson.', price: 39, theme: 'python', icon: '🐍',
    videos: ['Setting up Python', 'Lists and loops', 'Writing functions'] },
  { title: 'Data Science Essentials', description: 'Clean a dataset, explore it with pandas and chart what you find.', price: 59, theme: 'data', icon: '📊',
    videos: ['Loading data with pandas', 'Your first chart'] }
];

let counter = 0;
const oid = () => '67' + (Date.now().toString(16).slice(-6)) + (++counter).toString(16).padStart(4, '0');

let state;
function freshState() {
  const courses = SEED.map(c => ({ ...c, _id: oid(), instructorId: USERS.instructor._id, userId: null, videos: c.videos.map(t => ({ title: t })) }));
  return {
    role: 'user', mode: 'current', view: 'catalog', watchId: null, message: '',
    courses, enrollments: [],
    discussions: { [courses[0]._id]: [{ name: 'Jordan Lee', content: 'Lesson 2 finally made useState click for me.', at: '10:42 AM' }] },
    draft: { title: '', price: '', lesson: '' }
  };
}

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const me = () => USERS[state.role];
const original = c => c.userId === null;
const now = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

// ---------- API log ----------
function api(method, path, body, status, response, note) {
  const li = document.createElement('li');
  const ok = status < 400;
  const auth = state.mode === 'fixed' && path !== '/user/login' && method !== '—' ? '<span class="hdr">Authorization: Bearer eyJhbGciOi…</span>' : '';
  li.innerHTML = `<div class="req"><i class="m ${method.toLowerCase()}">${method}</i><code>${esc(path)}</code><b class="${ok ? 'ok' : 'err'}">${status}</b></div>
    ${auth}${body ? `<pre>${esc(JSON.stringify(body))}</pre>` : ''}<p>${esc(response)}</p>${note ? `<p class="note">${esc(note)}</p>` : ''}`;
  const log = $('api-log');
  log.prepend(li);
  while (log.children.length > 14) log.lastChild.remove();
  renderDb();
}

function renderDb() {
  const copies = state.courses.filter(c => !original(c)).length;
  $('db').innerHTML = `courses <b>${state.courses.length}</b>${copies ? ` <em>(${copies} cop${copies === 1 ? 'y' : 'ies'})</em>` : ''}` +
    (state.mode === 'fixed' ? ` · enrollments <b>${state.enrollments.length}</b>` : '');
}

// ---------- Queries, mirroring courseRoutes.js ----------
function getCourses() {
  if (state.role === 'instructor') return state.courses.filter(c => c.instructorId === me()._id); // Course.find({ instructorId })
  return state.courses;                                                                            // Course.find()
}
function getDashboard() {
  if (state.mode === 'fixed') return state.enrollments.filter(e => e.userId === me()._id).map(e => state.courses.find(c => c._id === e.courseId));
  return state.courses.filter(c => c.userId === me()._id);                                         // Course.find({ userId })
}

// ---------- Actions ----------
function go(view, opts = {}) {
  state.view = view;
  state.message = opts.message || '';
  if (opts.id) state.watchId = opts.id;
  if (view === 'catalog') {
    const q = state.mode === 'fixed' ? '/course/get' : `/course/get?userId=${me()._id}&role=${state.role}`;
    const list = getCourses();
    api('GET', q, null, 200, `${list.length} course${list.length === 1 ? '' : 's'} returned`,
      state.mode === 'current' && list.some(c => !original(c)) ? 'Copies made by enrollments are real course documents, so they come back too.' : '');
  }
  if (view === 'dashboard') {
    const list = getDashboard();
    if (state.mode === 'fixed') api('GET', '/enrollments/me', null, 200, `${list.length} enrollment${list.length === 1 ? '' : 's'}, courses populated`);
    else api('GET', `/course/dashboard?userId=${me()._id}`, null, 200, `${list.length} course${list.length === 1 ? '' : 's'} returned`);
  }
  if (view === 'watch') {
    const id = state.watchId;
    api('GET', `/course/get/${id}` + (state.mode === 'current' ? `?userId=${me()._id}&role=${state.role}` : ''), null, 200, 'Course with lessons');
    const n = (state.discussions[id] || []).length;
    api('GET', `/discussion/${id}`, null, 200, `${n} comment${n === 1 ? '' : 's'}, author names populated`);
  }
  render();
}

function enroll(id) {
  const course = state.courses.find(c => c._id === id);
  if (state.mode === 'fixed') {
    const exists = state.enrollments.some(e => e.userId === me()._id && e.courseId === id);
    if (exists) {
      api('POST', '/enrollments', { courseId: id }, 409, 'Already enrolled');
      state.message = 'Already on your dashboard.';
    } else {
      state.enrollments.push({ userId: me()._id, courseId: id });
      api('POST', '/enrollments', { courseId: id }, 201, 'Enrollment created', 'One small document links learner to course. The catalog is unchanged.');
      state.message = `Added “${course.title}” to your dashboard.`;
    }
    render();
    return;
  }
  // Current build: ViewCourses.js copies the course into a new document.
  const copy = { ...course, _id: oid(), userId: me()._id, videos: course.videos.map(v => ({ ...v })) };
  state.courses.push(copy);
  api('POST', '/course/add', { title: course.title, price: course.price, videos: `[${course.videos.length}]`, instructorId: course.instructorId, userId: me()._id },
    201, 'Course added successfully', 'A new course document was created. Click again and you get another one.');
  state.message = 'Course added successfully';
  render();
}

function unenroll(id) {
  if (state.mode === 'fixed') {
    state.enrollments = state.enrollments.filter(e => !(e.userId === me()._id && e.courseId === id));
    api('DELETE', `/enrollments/${id}`, null, 200, 'Enrollment removed');
  } else {
    state.courses = state.courses.filter(c => !(c._id === id && c.userId === me()._id));
    api('DELETE', `/course/remove/${id}?userId=${me()._id}`, null, 200, 'Course removed from dashboard');
  }
  go('dashboard', { message: 'Removed from your dashboard.' });
}

function comment(text) {
  const id = state.watchId;
  (state.discussions[id] = state.discussions[id] || []).push({ name: me().fullName, content: text, at: now() });
  const course = state.courses.find(c => c._id === id);
  api('POST', '/discussion/add', { courseId: id, userId: me()._id, content: text.slice(0, 40) + (text.length > 40 ? '…' : '') }, 201, 'Comment added',
    course && !original(course) ? 'This comment is attached to a copy, so learners viewing the original course will not see it.' : '');
  render();
}

function publish() {
  const d = state.draft;
  if (!d.title.trim() || !d.price || !d.lesson.trim()) { state.message = 'Add a title, a price and at least one lesson.'; render(); return; }
  const course = { title: d.title.trim(), description: 'Published from the Add Course form.', price: Number(d.price), theme: 'new', icon: '✦',
    videos: [{ title: d.lesson.trim() }], _id: oid(), instructorId: me()._id, userId: null };
  state.courses.push(course);
  api('POST', '/course/add', { title: course.title, price: course.price, videos: '[1]', instructorId: me()._id }, 201, 'Course added successfully');
  state.draft = { title: '', price: '', lesson: '' };
  go('catalog', { message: `Published “${course.title}”. Learners can now see it.` });
}

function signIn(role) {
  state.role = role;
  api('POST', '/user/login', { email: role === 'user' ? 'alex@example.com' : 'maya@example.com', password: '••••••' }, 200,
    state.mode === 'fixed' ? `role: ${role}, token issued` : `role: ${role}, userId: ${USERS[role]._id}`);
  go('catalog');
}

// ---------- Rendering ----------
function card(c, actions) {
  const copy = state.mode === 'current' && !original(c);
  return `<article class="course${copy ? ' is-copy' : ''}">
    <div class="thumb t-${c.theme}"><b>${c.icon}</b>${copy ? '<span class="dup">duplicate document</span>' : ''}</div>
    <div class="course-body"><h4>${esc(c.title)}</h4><p>${esc(c.description)}</p>
    <div class="course-meta"><span>${c.videos.length} lesson${c.videos.length === 1 ? '' : 's'}</span><strong>$${c.price}</strong></div>
    <div class="course-actions">${actions}</div></div></article>`;
}

function render() {
  const role = state.role;
  const links = role === 'user' ? [['catalog', 'Courses'], ['dashboard', 'Dashboard']] : [['catalog', 'My Courses'], ['add', 'Add Course']];
  $('app-links').innerHTML = links.map(([v, t]) => `<button data-go="${v}" class="${state.view === v ? 'on' : ''}">${t}</button>`).join('');
  $('avatar').textContent = me().initials;
  $('avatar').title = `${me().fullName} (${role === 'user' ? 'learner' : 'instructor'})`;
  const paths = { catalog: 'courses', dashboard: 'dashboard', add: 'add-course', watch: `watch/${state.watchId}` };
  $('url').textContent = `elevatehub.app/${paths[state.view]}`;
  document.querySelectorAll('[data-role]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.role === role)));
  document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));

  const msg = state.message ? `<div class="toast">${esc(state.message)}</div>` : '';
  let html = '';

  if (state.view === 'catalog') {
    const list = getCourses();
    const title = role === 'user' ? 'Explore courses' : 'My courses';
    const sub = role === 'user' ? `${list.length} courses in the catalog` : `${list.length} courses you authored`;
    html = `<div class="screen-head"><h3>${title}</h3><span>${sub}</span></div>${msg}<div class="grid">` +
      list.map(c => card(c, role === 'user'
        ? `<button class="btn primary" data-enroll="${c._id}">Add to Dashboard</button><button class="btn" data-watch="${c._id}">Watch</button>`
        : `<button class="btn" data-watch="${c._id}">Preview</button>`)).join('') + '</div>';
  }

  if (state.view === 'dashboard') {
    const list = getDashboard();
    html = `<div class="screen-head"><h3>My dashboard</h3><span>${list.length} enrolled</span></div>${msg}` +
      (list.length ? '<div class="grid">' + list.map(c => card(c,
        `<button class="btn primary" data-watch="${c._id}">Watch Course</button><button class="btn" data-remove="${c._id}">Remove</button>`)).join('') + '</div>'
        : `<div class="empty"><p>Your dashboard is empty.</p><button class="btn primary" data-go="catalog">Browse courses</button></div>`);
  }

  if (state.view === 'watch') {
    const c = state.courses.find(x => x._id === state.watchId);
    if (!c) { go('catalog'); return; }
    const comments = state.discussions[c._id] || [];
    html = `<div class="watch-hero t-${c.theme}"><b>${c.icon}</b><div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p></div></div>
      <div class="watch-grid"><div><h5>Lessons</h5><ol class="lessons-list">${c.videos.map((v, i) => `<li><span class="play">▶</span>${i + 1}. ${esc(v.title)}</li>`).join('')}</ol></div>
      <div><h5>Discussion <small>${comments.length}</small></h5><ul class="comments">${comments.length ? comments.map(m => `<li><span class="mini-av">${esc(m.name.split(' ').map(p => p[0]).join(''))}</span><div><b>${esc(m.name)}</b> <time>${esc(m.at)}</time><p>${esc(m.content)}</p></div></li>`).join('') : '<li class="none">No comments yet. Start the discussion.</li>'}</ul>
      <form class="comment-form" id="comment-form"><label class="sr" for="comment-input">Comment</label><input id="comment-input" maxlength="160" placeholder="Share a thought on this course" autocomplete="off"><button class="btn primary">Post</button></form></div></div>
      <button class="btn back" data-go="${role === 'user' && !original(c) ? 'dashboard' : 'catalog'}">← Back</button>`;
  }

  if (state.view === 'add') {
    const d = state.draft;
    html = `<div class="screen-head"><h3>Add a course</h3><span>Published courses appear in every learner's catalog</span></div>${msg}
      <form class="add-form" id="add-form">
        <label>Course title<input id="f-title" value="${esc(d.title)}" placeholder="e.g. CSS Grid in an Afternoon" maxlength="60"></label>
        <label>Price (USD)<input id="f-price" type="number" min="0" max="999" value="${esc(d.price)}" placeholder="29"></label>
        <label class="wide">First lesson title<input id="f-lesson" value="${esc(d.lesson)}" placeholder="e.g. Rows, columns and gaps" maxlength="60"></label>
        <button class="btn primary wide">Publish course</button>
      </form>`;
  }

  $('screen').innerHTML = html;
  renderExplain();
  renderDb();
}

function renderExplain() {
  const copies = state.courses.filter(c => !original(c)).length;
  const el = $('explain');
  if (state.mode === 'current') {
    el.className = 'explain current';
    el.innerHTML = `<b>Current build</b><p>${copies
      ? `You've created ${copies} duplicate course document${copies === 1 ? '' : 's'}. ${state.role === 'user' ? 'They now show up in the catalog' : 'They show up in your instructor list too, because each copy keeps your instructorId'}. Switch to <em>Proposed fix</em> to compare.`
      : 'Click <em>Add to Dashboard</em> on a course, then look at the catalog and the course count above the request log.'}</p>`;
  } else {
    el.className = 'explain fixed';
    el.innerHTML = '<b>Proposed fix</b><p>Enrolling writes one Enrollment document and the catalog never changes. Each request carries a JWT, so the server, not the query string, decides who is asking. This mode shows a design; it is not in the repository yet.</p>';
  }
}

// ---------- Events ----------
document.addEventListener('click', e => {
  const t = e.target.closest('button');
  if (!t) return;
  if (t.dataset.go) go(t.dataset.go);
  else if (t.dataset.enroll) enroll(t.dataset.enroll);
  else if (t.dataset.watch) go('watch', { id: t.dataset.watch });
  else if (t.dataset.remove) unenroll(t.dataset.remove);
  else if (t.dataset.role && t.dataset.role !== state.role) signIn(t.dataset.role);
  else if (t.dataset.mode && t.dataset.mode !== state.mode) {
    state = { ...freshState(), role: state.role, mode: t.dataset.mode };
    $('api-log').innerHTML = '';
    api('—', state.mode === 'fixed' ? 'Switched to proposed Enrollment model' : 'Switched to current build', null, 200, 'Sample data reset');
    go('catalog');
  }
});

document.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id === 'comment-form') {
    const v = $('comment-input').value.trim();
    if (v) comment(v);
  }
  if (e.target.id === 'add-form') {
    state.draft = { title: $('f-title').value, price: $('f-price').value, lesson: $('f-lesson').value };
    publish();
  }
});

document.addEventListener('input', e => {
  if (!state || state.view !== 'add') return;
  const map = { 'f-title': 'title', 'f-price': 'price', 'f-lesson': 'lesson' };
  if (map[e.target.id]) state.draft[map[e.target.id]] = e.target.value;
});

$('reset').addEventListener('click', () => {
  const mode = state.mode, role = state.role;
  state = { ...freshState(), mode, role };
  $('api-log').innerHTML = '';
  go('catalog');
});

state = freshState();
api('POST', '/user/login', { email: 'alex@example.com', password: '••••••' }, 200, `role: user, userId: ${USERS.user._id}`);
go('catalog');
