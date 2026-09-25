(() => {
  const login = () => {
    document.body.style.visibility = 'hidden';
    location.replace(new URL('index.html', location.href).href);
  };
  const load = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src; script.onload = resolve; script.onerror = reject;
    document.head.append(script);
  });
  async function start() {
    try {
      const cfg = window.LEDGER_CONFIG || {};
      if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase) return login();
      const client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
      const { data, error } = await client.auth.getUser();
      if (error || !data.user) return login();
      const userId = data.user.id;
      window.houseUserId = userId;
      let allowed = true;
      client.auth.onAuthStateChange((event, session) => {
        if (!session || session.user.id !== userId) { allowed = false; login(); }
      });
      await load('ledger-store.js');
      if (!allowed) return;
      await load('preview.js');
      if (!allowed) return;
      document.body.style.visibility = 'visible';
      window.addEventListener('pageshow', event => { if(event.persisted) location.reload(); });
      document.addEventListener('visibilitychange', async () => {
        if (document.hidden) return;
        document.body.style.visibility = 'hidden';
        try {
          const result = await client.auth.getUser();
          if (result.error || result.data.user?.id !== userId) return login();
          if (allowed) document.body.style.visibility = 'visible';
        } catch { login(); }
      });
    } catch {
      document.body.style.visibility = 'visible';
      document.body.replaceChildren();
      const message = document.createElement('p');
      message.textContent = '暂时无法验证登录或加载小屋，请检查网络后重试。';
      const link = document.createElement('a');
      link.href = 'index.html'; link.textContent = '返回登录';
      document.body.append(message, link);
    }
  }
  start();
})();
