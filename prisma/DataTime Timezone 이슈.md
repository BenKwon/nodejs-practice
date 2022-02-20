# Prisma DataTime Timezone 이슈

prisma를 사용하다가 이상한점을 발견했다.

 
```sql
model user{
  id Int @id @default(autoincrement()) 
  email String @unique @db.VarChar(50) 
  password String
  created_at DateTime @default(now())
  drive drive?
  takeout takeout_queue[]
}
```

위 model의 created_at처럼 DateTime형식의 데이터에 값을 넣어주면 현재 os나 mysql의 time이 KST로 설정되어있음에도
DB에 UTC로 설정되어 들어간다. 즉 9시간 이전 시간이 들어간다.

예를 들어 2022년-02월-18일 오후 11시에에 prisma의 create함수로 새로운 row를 만들면 데이터베이스에는 9시간 이전 시간인 2022년-02월-18일 오후 3시가 들어가있게 된다.

 

이에 대한 가장 최근 이슈를 읽어봤는데 prisma 개발자는 현재 해당 문제를 고칠생각은 없어보이고 이에 대한 답변으로는 그냥 locally하게 시간을 변환하라고 한다.  

https://github.com/prisma/prisma/discussions/4153
```
DateTime timezone · Discussion #4153 · prisma/prisma

Currently, with a field of type DateTime and @default(now()), when creating a new record this field is saved with a date on UTC timezone, is it possible to change this default timezone?

github.com
```
 

그리고 이전에 다른 한국 개발자가 해당 문제를 발견하고 올린 이슈도 있었다.

https://github.com/prisma/prisma/issues/5051
```
Improve Timezone Support for Existing MySQL Databases configured with a Non-UTC Timezone · Issue #5051 · prisma/prisma

Bug description The OS and MySQL time both are set to KST(Korea Standard Time) which is UTC+9:00. But when create or update records with new Date(), DATETIME string doesn't respect the database...

github.com
```
  
위 이슈에서 해결책을 찾을 수가 있었는데  뭐 사실 위에서 말했던 것 같이 그냥 locally하게 시간을 넣어줄 때 9시간 넣어서 올려주는 방법이다.  

근데 생각해보면 진짜 번거로운게 @default(now()) 구문을 사용할 수가 없고, 이 구문을 사용해서 create시 시간을 자동으로 들어가게 하려면 locally하게 db에서 select해오고나서 시간을 9시간 더해줘야한다.

 

**그럼 방법은 정해졌다.**

1. create할때 시간은 manually하게 9시간 더해줘서 넣는다.
2. create할때 시간을 @default(now())로 auto generate하고 나중에 불러올때 9시간을 더해준다.
 

우선 나같은 경우는 1번방법을 사용할 것 같다.

그 이유는 데이터베이스에 우리가 이용하려는 시간이 정확히 들어가 있으면 나중에 prisma에서 다른 ORM으로 바꿀때 불필요한 추가 작업이 없기 때문이다.

 

// UTC-9 using dayjs
export const dbNow = (): Date => dayjs().add(9, 'hour').toDate()

const now = dbNow()

await prisma.user.create({
  data: {
    createdAt: now,
    updatedAt: now,
  },
})

이런식으로 지금 개발해온 코드를 전부 수정해야한다...

