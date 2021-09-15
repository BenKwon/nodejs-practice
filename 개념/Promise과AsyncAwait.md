## 개요

> 비동기 프로그래밍을 위한 Promise와 AsyncAwait에 대한 내용 정리

### Promise

```js
import fetch from 'node-fetch';

const promise = fetch("http://samplejsonap.com/user);

promise
  .then(res => res.json())
  .then(user=> console.log(user.name);
  .catch(err => console.log(err));

```
> 프로미스의 장점중 하나는 모든 에러처리를 하나의 함수로 처리 가능한다.  

```js
console.log('Sync1');
const codeBlocker= ()=>{
  let i = 0 ;
  while(i<1000000000){i++}
}
codeBlocker();
console.log('Sync2');

```
> 위와 같이하면 Sync1가 0ms에 실행이 되어 출력되고 Sync2는 codeBlocker()에 의해 약 715ms(컴퓨터마다 다름)이후에 실행된다.

### Promise를 잘못 사용한 경우
```js
console.log('Sync1');
const codeBlocker= ()=>{ 
  return new Promise((resolve, reject) =>{
    let i = 0 ;
    while(i<1000000000){i++}
    resolve("blocker is done");
  });
  
}
codeBlocker();
console.log('Sync2');

```
> 위와 같이해도 Sync1가 0ms에 실행이 되어 출력되고 Sync2는 codeBlocker()에 의해 약 715ms(컴퓨터마다 다름)이후에 실행된다.
그 이유는 **프로미스는 then을 만나기 전까지는 비동기로 작동하기 때문이다.**

### Promise를 올바르게 사용한 경우
```js
console.log("Sync1");
const codeBlocker = () => {
	return Promise.resolve().then((v) => {
		let i = 0;
		while (i < 1000000000) {
			i++;
		}
	});
};

codeBlocker();
console.log("Sync2");
```
> Sync2가 Sync1에 이어 바로 출력된다.

### Promise의 한계
> Promise는 콜백지옥을 해결하기 위한 좋은 해결책이지만 여전히 Promise 지옥도 존재한다.
```js
db.then(...).then(...).then(...)
```
따라서 Async & Await가 등장한다.


## Async 과 Await
```
const getFruit = async (name) => {
  const fruits = {
    pineapple: '🍍',
    peach: '🍑',
    strawberry: '🍓'
  };

  return fruits[name];
};
만약 위 코드를 async키워드를 사용하지 않고 프로미스를 나타면 아래 코드와 같다.  
```js
const getFruit = (name) => {
  const fruits = {
    pineapple: '🍍',
    peach: '🍑',
    strawberry: '🍓'
  };

  return Promise.resolve.([name]);
};
```
즉 반환값을 프로미스 resolve로 감싸주는 것이 async 키워드이다.  
async키워드는 await가 나타날때 더 강력해지는데 이를 합치면 함수의 실행을 Pause 시킬 수 있다.  
또한 프로미스는 다수의 step(then 구문)끼리 변수를 공유하는 것이 복잡했는데 이를 쉽게 해결할 수 있다.
#### 프로미스 버전 변수 공유
```js
const makeSmoothie2 = () => {
  let a;
  return getFruit('pineapple')
    .then(v => {
      a = v;
      return getFruit('strawberry');
    })
    .then(v => [a, v]);
};
```
#### Async Await 활용 변수 공유
```js
export const makeSmoothie = async () => {
  const a = await getFruit('pineapple');
  const b = await getFruit('strawberry');

  return [a, b];
};
```

> 현재 위코드에서 파인애플과 딸기를 동시에 가져오지 못하고 하나씩 가져오고 있다.  
즉 위 코드에서 과일 한개를 가져오는데 1초가 걸린다면 2개의 과일을 가져오는데 총 약 2초가 소요된다.  
이를 해결하기 위해서 async 함수가 항상 promise를 리턴한다는 것을 이용한다.

```js
export const makeSmoothie = async () => {
  const a = await getFruit('pineapple');
  const b = await getFruit('strawberry');
  const smoothie =await Prmomise.all([a,b]);
  return smoothie;
};
```
위 코드는 배열안에 있는 모든 프로미스들이 병렬적으로 실행되는 코드이다.

### Async Await의 에러 핸들링
> Try Catch문을 이용한다. 


### 팁
#### map을 활용해서 concurrent하게 비동기 처리
```js
const fruits = ['peach', 'pineapple' , 'strawberry'];
const smoothie = fruits.map(async v => {
   const emoji = await getFruit(v);
   console.log(emoji);
   return emojil
});

```
> map을 활용해서 위와 같이 비동기 처리를 하면 concurrent하게 처리는 되나 순서성이 사라져서 과일이 랜덤하게 출력된다.  
> Promise.all이랑 비슷한 갈래로 처리되는 것 같다.

#### map을 활용하고 나서 값을 순서대로 사용하고 싶을때
> 배열안에 있는 것들이 resolve되기를 기다리고 즉시 다음으로
```js
const fruitLoop = async () => {
	for await(const emoji of smoothie) {

		console.log(emoji);
	}
};
```

#### 일반적인 순차처리
```js
const fruitLoop = async () => {
	for (const f of fruits) {
		const emoji = await getFruit(f);
		console.log(emoji);
	}
};
```
