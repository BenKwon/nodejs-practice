# async함수의동작방식
  
```js
async function f() {
    console.log("Hei2");
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("완료!"), 1000);
    });
    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
    console.log(result); // "완료!"
    console.log("Hei3");
}
f();
console.log("Hei");
```




### 생각 2
  
단순히 지금 껏 공부한 이론으로 위 코드를 분석해보면 
처음에 호출스택에 f()가 들어가고 console.log('Hei2'); 가 호츨스택에 실행되어서 나와 출력되고   
그 다음 프로미스가 생성되어서 setTimeout()이 호출스택에 들어가서 실행되고 백그라운드에 1초짜리 timer가 올라가고  
1초후에 task큐로가서 호출스택에 아무것도 없으면 then이 실행되어 result에 해당 값이 들어가고 console.log(result)와  
console.log("Hei3")가 출력된다고 생각되었다.  

### 의문점
  
하지만 실제 출력 결과는 Hei2 -> Hei -> 완료! -> Hei3 순이다.  
단순히 async함수와 await의 사용목적을 봤을땐 위 결과가 맞다고 생각하지만 자바스크립트에서 함수가 호출스택에서 어떻게 처리되는지 지금 껏 배운 내용으로는
위 결과가 안나온다.  

### 해결
  
나의 추측은 await 밑이 전부 then 함수처럼 처리되어서 백그라운드로가게 되고 f()가 종료되어 호출스택에서   
나와서 Hei가 먼저출력되고 그다음 백그라운드에있던 await promise밑 부분들이 테스크 큐로들어와 이벤트루프에 의해   
호출컨텍스트로 들어와 최종적으로 실행되는 것 이다.

### 결론
  
await을 만나는 순간 promise의 then과 같다. 거기서 함수 f는 호출스택에서 빠져나오게 된다. 이 때 Hei가 호출스택에 들어가서 호출된다.  
나중에 resolve되는 순간 await 부분부터 재개가 된다.(태스크큐->호출스택)  
