module.exports = {
  getOrder: (rest, callBackFunc) => {
    rest.activeOrders().then(orders => {
      let o;
      let t = [];
      for (let i = 0; i < orders.length; i += 1) {
        o = orders[i]
        o.status = o.status.toLowerCase()
        o.status = `${o.status[0].toUpperCase()}${o.status.substring(1)}`
        o.mtsCreate = new Date(o.mtsCreate).toLocaleString()
        o.mtsUpdate = new Date(o.mtsUpdate).toLocaleString()

        t.push([
          o.id, o.gid, o.cid, o.mtsCreate, o.mtsUpdate, o.symbol, o.type, o.amount,
          o.price, o.status.split(':')[0]
        ])
      }
      callBackFunc(t);
    }).catch(err => {
      console.log(err);
    })
  }
}
