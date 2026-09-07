(() => {
  let dialog;

  function showCommand(command, trigger) {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'install-dialog';
      dialog.setAttribute('aria-labelledby', 'install-dialog-title');
      dialog.innerHTML = `<form method="dialog"><h2 id="install-dialog-title">Install Drawn To</h2><button type="submit" aria-label="Close install command">×</button></form><p>Automatic copy is unavailable. Copy this command and run it in your terminal.</p><textarea aria-label="Install command" readonly spellcheck="false" rows="2"></textarea>`;
      document.body.append(dialog);
    }
    const field = dialog.querySelector('textarea');
    field.value = command;
    dialog.onclose = () => { if (trigger.isConnected) trigger.focus(); };
    dialog.showModal();
    field.focus();
    field.select();
  }

  async function copy(button, command, status) {
    if (button.dataset.busy) return;
    const label = button.querySelector('.w1');
    const originalLabel = button.dataset.copyLabel ||= button.getAttribute('aria-label');
    const originalText = label ? (button.dataset.copyText ||= label.textContent) : '';
    clearTimeout(button._t);
    button.dataset.busy = 'true';
    button.dataset.state = 'idle';
    status.textContent = '';
    try {
      await navigator.clipboard.writeText(command);
      if (!button.isConnected) return;
      button.dataset.state = 'done';
      button.setAttribute('aria-label', originalLabel);
      status.textContent = 'Install command copied.';
    } catch {
      if (!button.isConnected) return;
      button.setAttribute('aria-label', 'Copy failed. Try again.');
      if (label) label.textContent = 'Try again';
      status.textContent = 'Could not copy. Select the install command to copy it manually.';
      showCommand(command, button);
    } finally {
      delete button.dataset.busy;
      if (button.isConnected) button._t = setTimeout(() => {
        button.dataset.state = 'idle';
        button.setAttribute('aria-label', originalLabel);
        if (label) label.textContent = originalText;
      }, 1600);
    }
  }

  window.DrawnToInstall = { copy };
})();
