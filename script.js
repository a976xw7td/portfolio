/* =========================================================
   个人作品集初始页 —— 交互脚本
   E1 初始版，只做四件小事：
   1) 作品卡片数据渲染   2) 页脚年份   3) 移动端导航开合
   4) 导航当前区块高亮（IntersectionObserver）
   ========================================================= */

(function () {
  'use strict';

  /* 1) 作品数据：先放占位内容，E3/E4 换成真实作品 */
  var PROJECTS = [
    {
      title: '作品一（待补充）',
      desc: '一句话说明这个作品解决了什么问题、你做了什么。',
      meta: '2026 · 课程项目'
    },
    {
      title: '作品二（待补充）',
      desc: '一句话说明这个作品解决了什么问题、你做了什么。',
      meta: '2026 · 课程项目'
    },
    {
      title: '作品三（待补充）',
      desc: '一句话说明这个作品解决了什么问题、你做了什么。',
      meta: '2026 · 课程项目'
    }
  ];

  function renderProjects() {
    var grid = document.getElementById('projectGrid');
    if (!grid) return;

    // 用 textContent 写入文本，避免把用户数据当 HTML 解析
    PROJECTS.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'card';

      var h3 = document.createElement('h3');
      h3.textContent = item.title;

      var p = document.createElement('p');
      p.textContent = item.desc;

      var meta = document.createElement('p');
      meta.className = 'meta';
      meta.textContent = item.meta;

      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(meta);
      grid.appendChild(card);
    });
  }

  /* 2) 页脚年份自动更新 */
  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* 3) 移动端导航开合 */
  function initNavToggle() {
    var btn = document.getElementById('navToggle');
    var nav = document.getElementById('siteNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // 点击导航项后自动收起（移动端体验）
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* 4) 滚动时高亮当前区块对应的导航项 */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.site-nav a[href^="#"]')
    );
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--text)'
            : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  function init() {
    renderProjects();
    setYear();
    initNavToggle();
    initScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
