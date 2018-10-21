const Query = {
  dogs(parent, AbortSignal, ctx, info) {
    return [{name: 'Lua' }, { name: 'Zuko' }];
  }
};

module.exports = Query;
