
개인적으로 노드를 이용해서 개발을 하면서 **Promise**에 대해서 직접 사용할 일이 없었다.

여기서 직접이라고 한 이유는 필자는 프로미스를 지원하는 모듈들을 이용하여 async/await로만 Promise를 간접적으로 다뤄왔다. 직접 Promise객체를 생성하여 이용한 적이 드물다는 이야기이다.

Promise에 대해서 좀 더 알아봐야겠다는 생각은 해왔지만 개발에 집중하여 자꾸 필요할 때만 구글링으로 이용하고 미루다가 최근에 정말 필요해져서 포스팅을 작성하려고한다.

## 왜 Promise객체를 직접 써야할까?

지금까지 개발해오면서 사용하던 fs모듈처럼 promise버전이 존재하면 Promise객체를 직접 사용해야 할 일이 없지만, 

**child\_process** 모듈의 **exec**같은 경우 콜백이 있다. 즉 **exec**을 콜백지옥에서 벗어나서 **Promise**를 이용하여 **async/await**로 쓰기 위해서 **Promisify**를 해야한다. **exec**말고도 우리가 흔히 알고있는 **setTimeout**과 같은 것도 마찬가지이다.

**exec은 callback방식이다.**

```js
exec(cmd, (error, stdout, stderr) => {
   if (error) {
    console.warn(error);
}
```

### Node js에서 callback을 지원하는 함수를 Promise 와 함께 사용하는법

그럼 이제 **Promise**를 활용하여 콜백을 지원하는 함수를 **Promise**처럼 쓸 수 있게 바꿔보려고 한다.

본문 예제에서는 **setTimeout**으로 예를 들려고 한다.

```js
function setTimeoutPromisify(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
           resolve("딜레이 만큼  시간 지났다!")
        }, delay);
    
    });
}
```

위와 같이 하면 **setTimeOut**을 프로미스처럼 사용할 수 있게 된다. 즉 **setTimeOut**함수를 **async**/**await**과 함께 사용하여 가독성을 높일 수 있다.

```js
function setTimeoutPromisify(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
           resolve("딜레이 만큼  시간 지났다!")
        }, delay);
    
    });
}

(async () => {
   console.log(await setTimeoutPromisify(3000));
   console.log("3초후 이 문장이 출력!");
})();
```

위 코드를 실행시키면 async await을 활용하여 3초후 이 문장이 출력이라는 문장이 3초후에 출력이 되게 된다.

### 마치며..

사실 위에서 프로미스 객체를 직접 생성하여 callback패턴으로 Promise패턴으로 바꿨지만 이미 util모듈의 promisify를 통해 이를 대신 해주는 모듈이 있다.
```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
lsExample();
```
하지만 이를 쓰기 전에 직접 해보는거랑 안해보는거랑은 큰 차이가 있다고 생각한다.

 

Promise는 자바스크립트에서 동기적인 부분을 동기적으로 동작하게 바꿀 때 가독성이 있게 바꾸는 좋은 개념이다. 물론 위 예제처럼 콜백 체인이 복잡하지 않은 경우 그냥 사용하는게 낫겠지만    async/await에 익숙한 경우 혹은 체인이 복잡해서 콜백 지옥이 다가오는 경우는 Promise를 쓰자.
