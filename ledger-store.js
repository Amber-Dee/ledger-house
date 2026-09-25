(() => {
  if (!window.houseUserId) throw new Error('请先登录');
  const key = 'house-bills-v1:' + window.houseUserId;
  const native = window.HouseLedger;
  function read() {
    const raw = native ? native.read() : (localStorage.getItem(key) || '[]');
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows)) throw new Error('账目格式异常');
    return rows;
  }
  function save(rows) {
    const raw = JSON.stringify(rows);
    if (native) {
      if (!native.write(raw)) throw new Error('手机存储失败，账目未保存');
    } else localStorage.setItem(key, raw);
  }
  window.houseLedger = { read, save };
})();
