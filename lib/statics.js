
function nEw(classFn, ...rest){
  var instance = Reflect.construct(classFn, rest);

  return instance.__getDone();
}

module.exports = nEw;
