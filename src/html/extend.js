
$.extend({
  getUrlParam: function (name) {
    var sReg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var sResult = window.location.search.substr(1).match(sReg);
    if (sResult != null)
      return unescape(sResult[2]);
    return null;
  }
})

async function getDataFromIframeDialog(id) {
  return await syncMessage(id);
}

function closeIframeDialog(id, data) {
  parent.postMessage({
    gid: id,
    callbackData: data,
  });
}


function syncMessage(id) {
  return new Promise((resolve) => {
    parent.postMessage({
      gid: id,
    });
    window.addEventListener('message', function (ev) {
      const { data } = ev;
      resolve(data);
    })
  })
}
