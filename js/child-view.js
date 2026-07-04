const ChildViewPage = (() => {
  const {
    animatePercent,
    data,
    buildChildHref,
    requireSession,
    formatCurrency,
    getChildBundle,
    getCompletionStats,
    getLatestUnlockedBadge,
    getSelectedChildId,
    getStatusMeta,
    getWeekTasks,
    setHTML,
    setText,
  } = window.KancilApp;

  function getBadgeTheme(badge) {
    const themeMap = {
      featured: { icon: "🫙", bubble: "bg-[#EAFBF8]", accent: "bg-[#5ECFC1]" },
      saving: { icon: "🐿️", bubble: "bg-[#EAFBF8]", accent: "bg-[#5ECFC1]" },
      spending: { icon: "🧺", bubble: "bg-[#FFF0EA]", accent: "bg-[#FF8C61]" },
      streak: { icon: "🔥", bubble: "bg-[#FFF6D9]", accent: "bg-[#FFC94A]" },
      mission: { icon: "🎯", bubble: "bg-[#EAF0FB]", accent: "bg-[#2E4374]" },
      priority: { icon: "🧠", bubble: "bg-[#F2ECFA]", accent: "bg-[#B39DDB]" },
      lesson: { icon: "🦌", bubble: "bg-[#FFF6D9]", accent: "bg-[#FFC94A]" },
    };

    return themeMap[badge.badgeType] || { icon: "⭐", bubble: "bg-[#FFF6D9]", accent: "bg-[#FFC94A]" };
  }

  function renderHeader(bundle) {
    const backLink = document.getElementById("back-to-parent-link");
    if (backLink) {
      backLink.href = buildChildHref("parent-dashboard.html", bundle.child.id);
    }
    setText("child-header-title", bundle.child.name);
  }

  function renderHero(bundle, weekTasks) {
    const completion = getCompletionStats(weekTasks);
    setText("child-hero-name", bundle.child.name);
    setText("child-hero-intro", bundle.child.childIntro);
    setText("child-hero-week", bundle.child.weekLabel);
    setText("child-hero-praise", `“${bundle.child.heroPraise}”`);
    setText(
      "child-hero-progress",
      `Kamu sudah menyelesaikan ${completion.completed} misi minggu ini.`
    );

    const missionLink = document.getElementById("hero-mission-link");
    const goalLink = document.getElementById("hero-goal-link");
    if (missionLink) missionLink.href = "#mission-title";
    if (goalLink) goalLink.href = "#goal-title";
  }

  function renderMission(bundle, weekTasks) {
    setText(
      "mission-summary",
      `${Math.min(weekTasks.length, 3)} misi utama, ${Math.max(weekTasks.length - 3, 0)} bonus kecil`
    );
    setHTML(
      "mission-list",
      weekTasks
        .slice(0, 3)
        .map((task) => {
          const statusMeta = getStatusMeta(task.status);
          const bgMap = {
            selesai: "bg-[#EAFBF8]",
            berjalan: "bg-[#FFF0EA]",
            "belum selesai": "bg-[#F2ECFA]",
          };
          const iconMap = {
            selesai: "✅",
            berjalan: "🪙",
            "belum selesai": "💜",
          };

          return `
            <article class="rounded-[24px] ${bgMap[task.status]} p-4">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl" aria-hidden="true">
                  ${iconMap[task.status]}
                </div>
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-child-heading text-2xl text-[#2E4374]">${task.title}</h3>
                    <span class="rounded-full bg-white px-3 py-1 text-xs font-bold ${statusMeta.className}">
                      ${statusMeta.label}
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-[#2E4374]/75">${task.description}</p>
                </div>
              </div>
            </article>
          `;
        })
        .join("")
    );

    const monthlyBadges = bundle.badges.filter(
      (badge) => (badge.month || bundle.monthlyRecap.month) === bundle.monthlyRecap.month
    );
    const lockedBadge = monthlyBadges.find((badge) => badge.status === "locked");
    setText(
      "mission-kancil-note",
      lockedBadge
        ? `Kalau semua misi utama selesai, badge ${lockedBadge.badgeName.toLowerCase()} siap terbuka.`
        : "Semua misi utama sudah punya hadiah semangat dari Kancil."
    );
  }

  function renderGoal(bundle) {
    const goalEmptyState = document.getElementById("child-goal-empty-state");
    const goalPercent = Math.round((bundle.goal.currentAmount / bundle.goal.targetAmount) * 100);
    setText("goal-percent-chip", `${goalPercent}% menuju ${bundle.goal.goalName.toLowerCase()}`);
    setText("goal-name-child", bundle.goal.goalName);
    setText("goal-current-child", formatCurrency(bundle.goal.currentAmount));
    setText("goal-target-child", formatCurrency(bundle.goal.targetAmount));
    setText("goal-progress-text", `${goalPercent}%`);
    setText(
      "goal-milestone-text",
      goalPercent >= 75
        ? "Milestone 75% sudah lewat!"
        : "Targetmu terus bergerak!"
    );
    setText(
      "goal-milestone-note",
      goalPercent >= 75
        ? "Sedikit lagi menuju goal-mu. Kancil bantu ingatkan lagi besok."
        : "Kancil lihat dana goal-mu terus bertambah pelan-pelan."
    );

    const jarFill = document.getElementById("goal-jar-fill");
    const goalBar = document.getElementById("goal-progress-child-bar");
    animatePercent(jarFill, "height", goalPercent);
    animatePercent(goalBar, "width", goalPercent);

    const marker25 = document.getElementById("goal-marker-25");
    const marker50 = document.getElementById("goal-marker-50");
    const marker75 = document.getElementById("goal-marker-75");
    const marker100 = document.getElementById("goal-marker-100");
    if (marker25) marker25.dataset.active = String(goalPercent >= 25);
    if (marker50) marker50.dataset.active = String(goalPercent >= 50);
    if (marker75) marker75.dataset.active = String(goalPercent >= 75);
    if (marker100) marker100.dataset.active = String(goalPercent >= 100);

    if (goalEmptyState) {
      goalEmptyState.classList.toggle("hidden", Boolean(bundle.goal));
    }
  }

  function renderPockets(bundle) {
    setText("child-pocket-save-amount", formatCurrency(bundle.pocket.saveAmount));
    setText("child-pocket-spend-amount", formatCurrency(bundle.pocket.spendAmount));
  }

  function renderBadges(bundle) {
    const monthlyBadges = bundle.badges.filter(
      (badge) => (badge.month || bundle.monthlyRecap.month) === bundle.monthlyRecap.month
    );
    const unlocked = monthlyBadges.filter((badge) => badge.status === "unlocked");
    const latestBadge = getLatestUnlockedBadge(monthlyBadges);
    const totalBadges = monthlyBadges.length;
    const badgePercent = totalBadges ? Math.round((unlocked.length / totalBadges) * 100) : 0;
    const badgeEmptyState = document.getElementById("child-badge-empty-state");
    const featuredBadgeIcon = document.getElementById("featured-badge-icon");
    setText("badge-count-summary", `${unlocked.length}/${totalBadges} badge bulan ini`);
    setText("featured-badge-name", latestBadge ? latestBadge.badgeName : "Belum ada badge");
    setText(
      "featured-badge-description",
      latestBadge ? `Kancil bangga! ${latestBadge.description}` : "Badge bulan ini masih menunggu untuk dibuka."
    );
    setText("badge-month-summary", `Periode pencapaian: ${bundle.monthlyRecap.month}`);
    if (featuredBadgeIcon) {
      featuredBadgeIcon.textContent = latestBadge ? getBadgeTheme(latestBadge).icon : "🏅";
    }

    setHTML(
      "badge-carousel",
      monthlyBadges
        .map((badge) => {
          const isLocked = badge.status === "locked";
          const theme = getBadgeTheme(badge);
          return `
            <article class="w-48 rounded-[24px] ${
              isLocked ? "border border-dashed border-[#2E4374]/18 bg-white" : `${theme.bubble}`
            } p-4">
              <div class="flex items-start justify-between gap-3">
                <div class="flex h-14 w-14 items-center justify-center rounded-full ${isLocked ? "bg-[#FFF8F0]" : "bg-white"} text-3xl" aria-hidden="true">
                  ${theme.icon}
                </div>
                <span class="inline-flex items-center rounded-full ${isLocked ? "bg-[#F2ECFA]" : "bg-white"} px-3 py-1 text-xs font-extrabold text-[#2E4374]">
                  ${isLocked ? "🔒 Lucu" : "Terbuka"}
                </span>
              </div>
              <h3 class="font-child-heading mt-3 text-2xl text-[#2E4374]">${badge.badgeName}</h3>
              <p class="mt-2 text-sm text-[#2E4374]/75">${badge.description}</p>
              <p class="mt-3 text-xs font-bold ${isLocked ? "text-[#7E66B7]" : "text-[#2E4374]/60"}">
                ${isLocked ? "Masih bisa dikejar bulan ini." : `Tercapai di ${badge.month}.`}
              </p>
            </article>
          `;
        })
        .join("")
    );

    setText("badge-progress-text", `${badgePercent}% koleksi terbuka`);
    setText(
      "badge-progress-note",
      `${unlocked.length} dari ${totalBadges} badge berhasil dibuka. Awal bulan baru, badge bulanannya bisa dikejar lagi.`
    );
    const badgeProgressBar = document.getElementById("badge-progress-bar");
    animatePercent(badgeProgressBar, "width", badgePercent);

    if (badgeEmptyState) {
      badgeEmptyState.classList.toggle("hidden", monthlyBadges.length > 0);
    }
  }

  function renderStreak(bundle) {
    setText("streak-current", String(bundle.streak.currentStreak));
    setText("streak-best", `Best streak: ${bundle.streak.bestStreak} hari`);
  }

  function renderMessage(bundle) {
    setText("kancil-final-message", `“${bundle.child.heroPraise.replace(/!$/, "")}.”`);
    setText("kancil-final-note", bundle.child.childMessage);
  }

  function renderChildSwitcher(selectedChildId) {
    const switcher = document.getElementById("child-switcher");
    if (!switcher) return;

    switcher.innerHTML = data.children
      .map((child) => {
        const activeClass =
          child.id === selectedChildId
            ? "bg-[#2E4374] text-white"
            : "bg-white text-[#2E4374]";
        return `
          <a
            href="${buildChildHref("child-view.html", child.id)}"
            class="min-h-[44px] rounded-full px-4 py-3 text-sm font-extrabold shadow-sm shadow-[#2E4374]/5 focus:outline-none focus:ring-4 focus:ring-[#2E4374]/10 ${activeClass}"
          >
            ${child.name.split(" ")[0]}
          </a>
        `;
      })
      .join("");
  }

  function init() {
    const session = requireSession();
    if (!session) return;

    const childId = getSelectedChildId();
    const bundle = getChildBundle(childId);
    const weekTasks = getWeekTasks(bundle.tasks, 2);

    renderHeader(bundle);
    renderChildSwitcher(childId);
    renderHero(bundle, weekTasks);
    renderMission(bundle, weekTasks);
    renderGoal(bundle);
    renderPockets(bundle);
    renderBadges(bundle);
    renderStreak(bundle);
    renderMessage(bundle);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", ChildViewPage.init);
