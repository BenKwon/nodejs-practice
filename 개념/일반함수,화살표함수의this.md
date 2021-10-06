## 일반함수,화살표함수의 this
화살표 함수 내부에 this는 부모 함수의 this를 물려 받지만 옛날function의 this는 부모this와 fucntion의 this 즉 자기만의 this를 가진다

자기만의 this가 필요한 경우
```js
button.addEventListener('click',() =>{
     console.log(this.textContent)
} 
```

위 처럼 하면 부모의 this를 가지기 때문에 동작을 안한다.

따라서 옛날함수방식으로 바꿔줘야 동작함

Vue에서도 비슷한 문제가 있었는데

#### LoginMagement.vue 
```js
// 생략
methods: {
    searchLogs : function(){
      console.log(this.currentPage);
        // const params = {
        //     page : this.currentPage,
        //     startDate: this.startDate,
        //     endDate: this.endDate,
        //     keywordType : this.keywordType === '' ?  undefined : this.keywordType,
        //     keyword: this.keywordType === '' ? undefined : this.keyword
        // };
        // await this.$store.dispatch('admin/searchLoginLogs', params);
    }
  },
```
메소드에서 위와 같이 메소드를 추가할때 화살표 함수를 이용해서 this.currentPage같은 자신의 컴포넌트를 들고오면 undefined가 난다.  
vue 공부를 깊게 안해봐서 아직까진 정확한 이유를 구조적으로 파악 못했지만 아마 일반함수와 화살표 함수의 this의 차이때문인 것 같다..  
이유를 알아봐야겠다.  
