const DashboardPage = (() => {
  const {
    addChild,
    animatePercent,
    applyImportPayload,
    createExportPayload,
    data,
    buildChildHref,
    formatCurrency,
    getChildBundle,
    resetDemoData,
    setActiveChild,
    getCompletionStats,
    getLatestUnlockedBadge,
    getRewardSummary,
    getSelectedChildId,
    getStatusMeta,
    getWeekTasks,
    setClassName,
    setHTML,
    setText,
    updateChildProfile,
    validateImportPayload,
  } = window.KancilApp;

  function renderHeader(bundle, weekNumber) {
    setText("active-child-name", bundle.child.name);
    setText("active-period", `${bundle.monthlyRecap.month} - Minggu ${weekNumber}`);
    const childViewLink = document.getElementById("child-view-link");
    if (childViewLink) {
      childViewLink.href = buildChildHref("child-view.html", bundle.child.id);
    }
  }

  function renderQuickStats(bundle, weekTasks) {
    const completion = getCompletionStats(weekTasks);
    const latestBadge = getLatestUnlockedBadge(bundle.badges);

    setText("stat-weekly-tasks", String(completion.total));
    setText(
      "stat-weekly-tasks-note",
      `${completion.completed} selesai, ${completion.inProgress} berjalan`
    );
    setText("stat-completion-rate", `${completion.percentage}%`);
    setText("stat-completion-note", `Progress minggu ini untuk ${bundle.child.name}`);
    setText("stat-total-savings", formatCurrency(bundle.goal.currentAmount));
    setText(
      "stat-total-savings-note",
      `Target aktif ${Math.round((bundle.goal.currentAmount / bundle.goal.targetAmount) * 100)}% tercapai`
    );
    setText("stat-latest-badge", latestBadge ? latestBadge.badgeName : "Belum ada badge");
    setText(
      "stat-latest-badge-note",
      latestBadge?.unlockedAt ? `Didapat ${latestBadge.unlockedAt}` : "Badge pertama masih menunggu"
    );
    setText("stat-current-streak", `${bundle.streak.currentStreak} hari`);
    setText("stat-current-streak-note", `Best streak ${bundle.streak.bestStreak} hari`);
    setText("stat-active-children", String(data.children.length));
    setText("stat-active-children-note", "Maksimal 10 anak");
  }

  function renderChildSelector(selectedChildId) {
    const selector = document.getElementById("child-selector-list");
    const emptyState = document.getElementById("child-selector-empty-state");
    if (!selector) return;

    if (emptyState) {
      emptyState.classList.toggle("hidden", data.children.length > 0);
    }

    selector.innerHTML = data.children
      .map((child) => {
        const bundle = getChildBundle(child.id);
        const childTasks = getWeekTasks(bundle.tasks, 2);
        const completion = getCompletionStats(childTasks);
        const goalPercent = Math.round((bundle.goal.currentAmount / bundle.goal.targetAmount) * 100);
        const isActive = child.id === selectedChildId;

        return `
          <a
            href="${buildChildHref("parent-dashboard.html", child.id)}"
            class="rounded-2xl bg-white p-5 shadow-sm shadow-[#2E4374]/8 ${
              isActive ? "ring-2 ring-[#2E4374]" : "ring-1 ring-[#2E4374]/8"
            }"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold text-[#2E4374]"
                  style="background-color:${child.avatarColor}22"
                >
                  ${child.name.charAt(0)}
                </span>
                <div>
                  <h3 class="font-heading text-lg font-semibold">${child.name}</h3>
                  <p class="text-sm text-[#2E4374]/65">${child.focusText}</p>
                </div>
              </div>
              <span class="rounded-full bg-[#EAF0FB] px-3 py-1 text-xs font-semibold text-[#2E4374]">
                ${isActive ? "Aktif" : "Lihat"}
              </span>
            </div>
            <dl class="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt class="text-[#2E4374]/60">Tugas</dt>
                <dd class="mt-1 font-semibold">${completion.completed}/${completion.total}</dd>
              </div>
              <div>
                <dt class="text-[#2E4374]/60">Tabungan</dt>
                <dd class="mt-1 font-semibold text-[#5ECFC1]">${goalPercent}%</dd>
              </div>
              <div>
                <dt class="text-[#2E4374]/60">Streak</dt>
                <dd class="mt-1 font-semibold text-[#FFC94A]">${bundle.streak.currentStreak} hari</dd>
              </div>
            </dl>
          </a>
        `;
      })
      .join("");
  }

  function renderWeekTabs(weekNumber, childId) {
    const tabs = document.getElementById("week-tabs");
    if (!tabs) return;

    tabs.innerHTML = [1, 2, 3, 4]
      .map((week) => {
        const activeClass =
          week === weekNumber
            ? "bg-[#2E4374] text-white"
            : "bg-[#EAF0FB] text-[#2E4374]";
        return `
          <a
            href="${buildChildHref("parent-dashboard.html", childId)}&week=${week}"
            class="min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold ${activeClass}"
          >
            Minggu ${week}
          </a>
        `;
      })
      .join("");
  }

  function getSelectedWeekNumber() {
    const params = new URLSearchParams(window.location.search);
    const week = Number(params.get("week"));
    return week >= 1 && week <= 4 ? week : 2;
  }

  function renderWeeklyTracking(bundle, weekTasks) {
    const completion = getCompletionStats(weekTasks);
    const emptyState = document.getElementById("weekly-empty-state");
    setText("weekly-progress-title", `${completion.completed} dari ${completion.total} tugas selesai`);
    setText("weekly-progress-percent", `${completion.percentage}%`);
    const weeklyBar = document.getElementById("weekly-progress-bar");
    if (weeklyBar) {
      animatePercent(weeklyBar, "width", completion.percentage);
    }

    setHTML(
      "weekly-task-list",
      weekTasks
        .map((task) => {
          const statusMeta = getStatusMeta(task.status);
          return `
            <div class="grid gap-3 px-4 py-4 md:grid-cols-[1.8fr_1.3fr_1fr_1fr] md:items-center">
              <div>
                <p class="font-semibold">${task.title}</p>
                <p class="mt-1 text-sm text-[#2E4374]/65">${task.description}</p>
              </div>
              <div class="text-sm">
                <p class="font-medium">${task.rewardLabel}</p>
                <p class="text-[#2E4374]/60">${task.rewardType}</p>
              </div>
              <div>
                <span class="inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusMeta.className}">
                  ${statusMeta.label}
                </span>
              </div>
              <div class="text-sm text-[#2E4374]/70">${task.note}</div>
            </div>
          `;
        })
        .join("")
    );

    if (emptyState) {
      emptyState.classList.toggle("hidden", weekTasks.length > 0);
    }
  }

  function renderRewardSummary(bundle, weekTasks) {
    const rewards = getRewardSummary(weekTasks);
    setText("reward-money", formatCurrency(rewards.money));
    setText("reward-non-money", `${rewards.nonMoney} aktivitas spesial`);
    setText("reward-badge", `${rewards.badge} badge siap terbuka`);
    setText(
      "reward-note",
      `Fokus apresiasi ${bundle.child.name} tetap pada usaha dan kebiasaan, bukan hanya nominal uang.`
    );
  }

  function renderGoalAndPockets(bundle) {
    const goalEmptyState = document.getElementById("goal-empty-state");
    const goalPercent = Math.round((bundle.goal.currentAmount / bundle.goal.targetAmount) * 100);
    setText("goal-name", bundle.goal.goalName);
    setText("goal-target-date", `Target tercapai sebelum ${bundle.goal.targetDate}`);
    setText("goal-current-amount", formatCurrency(bundle.goal.currentAmount));
    setText("goal-percent-summary", `${goalPercent}% dari target ${formatCurrency(bundle.goal.targetAmount)}`);
    setText(
      "goal-remaining",
      `Sisa ${formatCurrency(bundle.goal.targetAmount - bundle.goal.currentAmount)}`
    );
    const goalBar = document.getElementById("goal-progress-bar");
    if (goalBar) {
      animatePercent(goalBar, "width", goalPercent);
    }

    setText("pocket-save-amount", formatCurrency(bundle.pocket.saveAmount));
    setText("pocket-save-note", `${bundle.pocket.allocationSavePercent}% untuk tujuan masa depan`);
    setText("pocket-spend-amount", formatCurrency(bundle.pocket.spendAmount));
    setText("pocket-spend-note", `${bundle.pocket.allocationSpendPercent}% untuk kebutuhan kecil`);
    setText("pocket-share-amount", formatCurrency(bundle.pocket.shareAmount));
    setText("pocket-share-note", `${bundle.pocket.allocationSharePercent}% untuk bantu orang lain`);

    const saveBar = document.getElementById("pocket-save-bar");
    const spendBar = document.getElementById("pocket-spend-bar");
    const shareBar = document.getElementById("pocket-share-bar");
    animatePercent(saveBar, "width", bundle.pocket.allocationSavePercent);
    animatePercent(spendBar, "width", bundle.pocket.allocationSpendPercent);
    animatePercent(shareBar, "width", bundle.pocket.allocationSharePercent);

    setText("pocket-save-percent", `Tabung ${bundle.pocket.allocationSavePercent}%`);
    setText("pocket-spend-percent", `Belanja ${bundle.pocket.allocationSpendPercent}%`);
    setText("pocket-share-percent", `Berbagi ${bundle.pocket.allocationSharePercent}%`);

    if (goalEmptyState) {
      goalEmptyState.classList.toggle("hidden", Boolean(bundle.goal));
    }
  }

  function renderBadgesAndStreak(bundle) {
    const latestBadge = getLatestUnlockedBadge(bundle.badges);
    const unlockedBadges = bundle.badges.filter((badge) => badge.status === "unlocked");
    const lockedBadges = bundle.badges.filter((badge) => badge.status === "locked");

    setText("latest-badge-name", latestBadge ? latestBadge.badgeName : "Belum ada badge");
    setText(
      "latest-badge-description",
      latestBadge ? latestBadge.description : "Badge akan muncul saat progress mulai berjalan."
    );
    setText("current-streak-large", String(bundle.streak.currentStreak));
    setText("best-streak-text", `Best streak: ${bundle.streak.bestStreak} hari`);
    setText("badge-unlocked-count", `${unlockedBadges.length} terbuka`);
    setText("badge-locked-count", `${lockedBadges.length} menunggu`);

    const sharingBadge = unlockedBadges.find((badge) => badge.badgeType === "sharing");
    setText(
      "badge-sharing-count",
      sharingBadge ? "1 badge berbagi" : "Belum ada badge berbagi"
    );
  }

  function renderMonthlyRecap(bundle) {
    setText("monthly-recap-title", `Rekap Bulanan ${bundle.monthlyRecap.month}`);
    setText("monthly-completed-tasks", `${bundle.monthlyRecap.completedTasks} / ${bundle.monthlyRecap.totalTasks}`);
    setText("monthly-total-reward", formatCurrency(bundle.monthlyRecap.totalReward));
    setText("monthly-total-saved", formatCurrency(bundle.monthlyRecap.totalSaved));
    setText("monthly-total-spent", formatCurrency(bundle.monthlyRecap.totalSpent));
    setText("monthly-total-shared", formatCurrency(bundle.monthlyRecap.totalShared));
    setText("monthly-best-streak", `${bundle.monthlyRecap.bestStreak} hari`);
  }

  function renderCharts(bundle) {
    const highestTask = Math.max(...bundle.child.monthlyTasks, 1);
    setHTML(
      "weekly-chart-bars",
      bundle.child.monthlyTasks
        .map((value, index) => {
          const height = Math.max(24, Math.round((value / highestTask) * 100));
          return `
            <div class="flex flex-1 flex-col items-center gap-3">
              <span class="text-xs font-semibold text-[#2E4374]/70">${value}</span>
              <div class="chart-animate flex w-full items-end rounded-t-2xl bg-gradient-to-t from-[#FF8C61] to-[#ffb197]" style="height:${height}%"></div>
              <span class="text-xs font-medium text-[#2E4374]/70">M${index + 1}</span>
            </div>
          `;
        })
        .join("")
    );

    setHTML(
      "savings-trend-list",
      bundle.child.savingsTrend
        .map((item) => {
          const max = bundle.goal.targetAmount;
          const width = Math.max(8, Math.round((item.amount / max) * 100));
          return `
            <div>
              <div class="mb-2 flex items-center justify-between text-sm text-[#2E4374]/70">
                <span>${item.label}</span>
                <span>${formatCurrency(item.amount)}</span>
              </div>
              <div class="h-3 rounded-full bg-white">
                <div class="progress-animate h-3 rounded-full bg-[#5ECFC1]" style="width:${width}%"></div>
              </div>
            </div>
          `;
        })
        .join("")
    );

    setText("chart-pocket-save", `${bundle.pocket.allocationSavePercent}%`);
    setText("chart-pocket-spend", `${bundle.pocket.allocationSpendPercent}%`);
    setText("chart-pocket-share", `${bundle.pocket.allocationSharePercent}%`);
    const chartSave = document.getElementById("chart-pocket-save-bar");
    const chartSpend = document.getElementById("chart-pocket-spend-bar");
    const chartShare = document.getElementById("chart-pocket-share-bar");
    animatePercent(chartSave, "width", bundle.pocket.allocationSavePercent);
    animatePercent(chartSpend, "width", bundle.pocket.allocationSpendPercent);
    animatePercent(chartShare, "width", bundle.pocket.allocationSharePercent);

    setText(
      "chart-badge-summary",
      `${bundle.badges.filter((badge) => badge.status === "unlocked").length} badge`
    );

    const unlockedBadges = bundle.badges.filter((badge) => badge.status === "unlocked").length;
    const totalBadges = bundle.badges.length;
    const badgePercent = totalBadges ? Math.round((unlockedBadges / totalBadges) * 100) : 0;
    setText("chart-badge-percent", `${badgePercent}%`);
    setText("chart-badge-ratio", `${unlockedBadges} dari ${totalBadges} badge terbuka`);
    setText(
      "chart-badge-next",
      bundle.badges.find((badge) => badge.status === "locked")?.badgeName || "Semua badge sudah terbuka"
    );
    const badgeBar = document.getElementById("chart-badge-bar");
    animatePercent(badgeBar, "width", badgePercent);
  }

  function renderCertificate(bundle) {
    const latestBadge = getLatestUnlockedBadge(bundle.badges);
    setText("certificate-month", `${bundle.monthlyRecap.month} Achievement`);
    setText("certificate-period", `Periode apresiasi: ${bundle.monthlyRecap.month}`);
    setText("certificate-child-name", bundle.child.name);
    setText("certificate-summary", `atas konsistensi menyelesaikan misi mingguan dan menjaga tabungan menuju target.`);
    setText("certificate-main-badge", latestBadge ? latestBadge.badgeName : "Belum ada badge utama");
    setText("certificate-completed", `${bundle.monthlyRecap.completedTasks} tugas`);
    setText("certificate-streak", `${bundle.monthlyRecap.bestStreak} hari`);
    setText("certificate-savings", formatCurrency(bundle.monthlyRecap.totalSaved));
    setText("certificate-badges", `${bundle.monthlyRecap.badgesUnlocked} badge`);
    setText(
      "certificate-message",
      `${bundle.child.name}, Kancil bangga karena kamu terus belajar mengatur uang dengan sabar, rapi, dan penuh semangat.`
    );
  }

  function updateDataStatus(mode, title, note, savedNote) {
    const baseClass =
      "mt-5 rounded-2xl p-4 text-sm";
    const variants = {
      neutral: `${baseClass} bg-[#EAF0FB] text-[#2E4374]/75`,
      success: `${baseClass} bg-[#EAFBF8] text-[#2E4374]/80`,
      warning: `${baseClass} bg-[#FFF0EA] text-[#2E4374]/80`,
      error: `${baseClass} bg-[#FFF0EA] text-[#2E4374]/80`,
    };

    setClassName("data-status-card", variants[mode] || variants.neutral);
    setText("data-status-text", `${title} ${note}`);
    if (savedNote) {
      setText("saved-status-text", savedNote);
    }
  }

  function getAvatarColorSelection() {
    return document.querySelector('input[name="avatar-color"]:checked')?.value || "#5ECFC1";
  }

  function openChildManagementPanel(config) {
    const panel = document.getElementById("child-management-panel");
    const modeInput = document.getElementById("child-management-mode");
    const childIdInput = document.getElementById("child-management-child-id");
    const title = document.getElementById("child-management-title");
    const description = document.getElementById("child-management-description");
    const nameInput = document.getElementById("child-name-input");
    const focusInput = document.getElementById("child-focus-input");
    const saveButton = document.getElementById("save-child-button");
    const activateButton = document.getElementById("activate-child-button");
    const panelStatus = document.getElementById("child-panel-status");

    if (!panel || !modeInput || !childIdInput || !nameInput || !focusInput) return;

    panel.classList.remove("hidden");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });

    if (config.mode === "edit" && config.child) {
      modeInput.value = "edit";
      childIdInput.value = config.child.id;
      title.textContent = `Kelola Profil ${config.child.name}`;
      description.textContent =
        "Perbarui nama tampilan, fokus belajar, atau pilih lagi anak aktif untuk dashboard ini.";
      nameInput.value = config.child.name;
      focusInput.value = config.child.focusText;
      saveButton.textContent = "Simpan Perubahan";
      panelStatus.textContent =
        "Perubahan profil akan langsung dipakai di Parent Dashboard dan Child View pada browser ini.";

      document
        .querySelectorAll('input[name="avatar-color"]')
        .forEach((input) => {
          input.checked = input.value === config.child.avatarColor;
        });

      if (activateButton) {
        activateButton.classList.toggle("hidden", config.child.activeStatus);
      }
      return;
    }

    modeInput.value = "add";
    childIdInput.value = "";
    title.textContent = "Tambah Profil Anak";
    description.textContent =
      "Tambahkan profil baru untuk mulai memantau misi, target tabungan, dan 3 kantong.";
    nameInput.value = "";
    focusInput.value = "";
    saveButton.textContent = "Simpan Profil Anak";
    panelStatus.textContent =
      "Profil baru akan otomatis mendapat target tabungan awal, ringkasan 3 kantong, dan empty state tugas mingguan.";

    document
      .querySelectorAll('input[name="avatar-color"]')
      .forEach((input, index) => {
        input.checked = index === 0;
      });

    if (activateButton) {
      activateButton.classList.add("hidden");
    }
  }

  function closeChildManagementPanel() {
    const panel = document.getElementById("child-management-panel");
    if (panel) {
      panel.classList.add("hidden");
    }
  }

  function bindChildManagementUI(selectedChildId) {
    const addButtons = [
      document.getElementById("open-add-child-button"),
      document.getElementById("empty-add-child-button"),
    ].filter(Boolean);
    const manageButton = document.getElementById("manage-profile-button");
    const cancelButton = document.getElementById("cancel-child-management-button");
    const activateButton = document.getElementById("activate-child-button");
    const form = document.getElementById("child-management-form");
    const modeInput = document.getElementById("child-management-mode");
    const childIdInput = document.getElementById("child-management-child-id");
    const nameInput = document.getElementById("child-name-input");
    const focusInput = document.getElementById("child-focus-input");
    const panelStatus = document.getElementById("child-panel-status");

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openChildManagementPanel({ mode: "add" });
      });
    });

    if (manageButton) {
      manageButton.addEventListener("click", () => {
        const activeChild = data.children.find((child) => child.id === selectedChildId);
        if (!activeChild) return;
        openChildManagementPanel({ mode: "edit", child: activeChild });
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", closeChildManagementPanel);
    }

    if (activateButton) {
      activateButton.addEventListener("click", () => {
        const childId = childIdInput?.value;
        if (!childId) return;

        setActiveChild(childId);
        window.location.href = buildChildHref("parent-dashboard.html", childId);
      });
    }

    if (form && modeInput && childIdInput && nameInput && focusInput) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const focusText = focusInput.value.trim();
        const avatarColor = getAvatarColorSelection();

        if (!name) {
          if (panelStatus) {
            panelStatus.textContent = "Nama anak masih kosong. Tambahkan nama singkat dulu, lalu simpan lagi.";
          }
          nameInput.focus();
          return;
        }

        if (modeInput.value === "edit") {
          const updated = updateChildProfile(childIdInput.value, {
            name,
            focusText,
            avatarColor,
          });

          if (!updated) {
            if (panelStatus) {
              panelStatus.textContent = "Profil belum berhasil diperbarui. Coba buka panel lagi dan ulangi.";
            }
            return;
          }

          window.location.href = buildChildHref("parent-dashboard.html", childIdInput.value);
          return;
        }

        if (data.children.length >= 10) {
          if (panelStatus) {
            panelStatus.textContent =
              "Batas demo saat ini adalah 10 profil anak agar dashboard tetap rapi dan mudah ditinjau.";
          }
          return;
        }

        const nextChildId = addChild({ name, focusText, avatarColor });
        window.location.href = buildChildHref("parent-dashboard.html", nextChildId);
      });
    }
  }

  function showImportFeedback(mode, title, note) {
    const feedback = document.getElementById("import-feedback");
    if (!feedback) return;

    feedback.classList.remove("hidden");
    feedback.className =
      `mt-4 rounded-2xl border p-4 text-sm ${
        mode === "success"
          ? "border-[#5ECFC1]/35 bg-[#EAFBF8]"
          : "border-[#FF8C61]/35 bg-[#FFF0EA]"
      }`;
    setText("import-feedback-title", title);
    setText("import-feedback-note", note);
  }

  function bindExportImportUI(selectedChildId, weekNumber) {
    const exportButton = document.getElementById("export-data-button");
    const importButton = document.getElementById("import-data-button");
    const resetButton = document.getElementById("reset-data-button");
    const confirmResetButton = document.getElementById("confirm-reset-button");
    const cancelResetButton = document.getElementById("cancel-reset-button");
    const fileInput = document.getElementById("import-file-input");
    const resetConfirmation = document.getElementById("reset-confirmation");

    if (exportButton) {
      exportButton.addEventListener("click", () => {
        const payload = createExportPayload(selectedChildId, weekNumber);
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `kancil-uangku-demo-${selectedChildId}.json`;
        link.click();
        URL.revokeObjectURL(url);

        updateDataStatus(
          "success",
          "Export selesai.",
          "File demo data berhasil disiapkan untuk diunduh.",
          `Terakhir diexport: ${new Date().toLocaleString("id-ID")}`
        );
        showImportFeedback(
          "success",
          "File export berhasil dibuat",
          "Data yang diunduh adalah snapshot demo data saat ini. Tidak ada backend yang terlibat."
        );
      });
    }

    if (importButton && fileInput) {
      importButton.addEventListener("click", () => fileInput.click());

      fileInput.addEventListener("change", async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
          const content = await file.text();
          const parsed = JSON.parse(content);
          const validation = validateImportPayload(parsed);

          if (!validation.valid) {
            updateDataStatus(
              "error",
              "Import gagal.",
              validation.message,
              "Status tersimpan belum berubah."
            );
            showImportFeedback("error", "Format file belum cocok", validation.message);
            return;
          }

          applyImportPayload(parsed);
          updateDataStatus(
            "success",
            "Import berhasil diterapkan.",
            "Snapshot data baru sudah dipakai di browser ini.",
            `Terakhir divalidasi: ${new Date().toLocaleString("id-ID")}`
          );
          showImportFeedback(
            "success",
            "File import valid",
            `${validation.message} Halaman akan memuat ulang untuk menampilkan data terbaru.`
          );
          window.setTimeout(() => {
            const nextChildId = parsed.selectedChildId || selectedChildId;
            window.location.href = buildChildHref("parent-dashboard.html", nextChildId);
          }, 700);
        } catch (error) {
          updateDataStatus(
            "error",
            "Import gagal.",
            "File belum bisa dibaca sebagai JSON yang valid.",
            "Status tersimpan belum berubah."
          );
          showImportFeedback(
            "error",
            "File tidak valid",
            "Pastikan file berformat JSON dan berasal dari export data Kancil Uangku."
          );
        } finally {
          fileInput.value = "";
        }
      });
    }

    if (resetButton && resetConfirmation) {
      resetButton.addEventListener("click", () => {
        resetConfirmation.classList.remove("hidden");
        updateDataStatus(
          "warning",
          "Konfirmasi dibutuhkan.",
          "Periksa kembali sebelum reset simulasi dijalankan.",
          "Status tersimpan belum berubah."
        );
      });
    }

    if (cancelResetButton && resetConfirmation) {
      cancelResetButton.addEventListener("click", () => {
        resetConfirmation.classList.add("hidden");
        updateDataStatus(
          "neutral",
          "Reset dibatalkan.",
          "Data demo tetap seperti sebelumnya.",
          "Terakhir ditinjau: 4 Juli 2026, 14:20 WIB"
        );
      });
    }

    if (confirmResetButton && resetConfirmation) {
      confirmResetButton.addEventListener("click", () => {
        resetConfirmation.classList.add("hidden");
        resetDemoData();
        updateDataStatus(
          "success",
          "Reset data selesai.",
          "Semua perubahan lokal sudah kembali ke demo awal.",
          `Terakhir direset simulasi: ${new Date().toLocaleString("id-ID")}`
        );
        showImportFeedback(
          "success",
          "Reset data berhasil",
          "Dashboard akan dimuat ulang dengan data demo awal."
        );
        window.setTimeout(() => {
          window.location.href = buildChildHref("parent-dashboard.html", getSelectedChildId());
        }, 700);
      });
    }
  }

  function bindInformationalButtons() {
    const monthlySwitchButton = document.getElementById("monthly-switch-button");

    if (monthlySwitchButton) {
      monthlySwitchButton.addEventListener("click", () => {
        updateDataStatus(
          "neutral",
          "Mode demo aktif.",
          "Rekap saat ini baru menampilkan Juli 2026 sesuai data contoh yang tersedia.",
          "Tidak ada perubahan data yang disimpan."
        );
      });
    }
  }

  function bindCertificatePreviewUI() {
    const previewButton = document.getElementById("certificate-preview-button");
    const printButton = document.getElementById("certificate-print-button");
    const previewCard = document.getElementById("certificate-preview-card");

    if (previewButton && previewCard) {
      previewButton.addEventListener("click", () => {
        previewCard.scrollIntoView({ behavior: "smooth", block: "center" });
        previewCard.classList.add("ring-4", "ring-[#FFC94A]/35");
        window.setTimeout(() => {
          previewCard.classList.remove("ring-4", "ring-[#FFC94A]/35");
        }, 1800);
      });
    }

    if (printButton) {
      printButton.addEventListener("click", () => {
        document.body.classList.add("certificate-print");
        window.print();
        const cleanup = () => {
          document.body.classList.remove("certificate-print");
          window.removeEventListener("afterprint", cleanup);
        };
        window.addEventListener("afterprint", cleanup);
        window.setTimeout(cleanup, 1000);
      });
    }
  }

  function init() {
    const childId = getSelectedChildId();
    if (!childId) return;
    const weekNumber = getSelectedWeekNumber();
    const bundle = getChildBundle(childId);
    const weekTasks = getWeekTasks(bundle.tasks, weekNumber);

    renderHeader(bundle, weekNumber);
    renderQuickStats(bundle, weekTasks);
    renderChildSelector(childId);
    renderWeekTabs(weekNumber, childId);
    renderWeeklyTracking(bundle, weekTasks);
    renderRewardSummary(bundle, weekTasks);
    renderGoalAndPockets(bundle);
    renderBadgesAndStreak(bundle);
    renderMonthlyRecap(bundle);
    renderCharts(bundle);
    renderCertificate(bundle);
    bindChildManagementUI(childId);
    bindExportImportUI(childId, weekNumber);
    bindInformationalButtons();
    bindCertificatePreviewUI();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", DashboardPage.init);
