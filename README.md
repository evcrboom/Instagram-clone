# Instagram clone

สร้างขึ้นมาเพื่อพัฒนาทักษะด้านการเขียนโปรแกรม (Nodejs, Postgres, React, Express).

มีการสร้างฐานข้อมูลเพื่อไว้ใช้เก็บข้อมูล username, password ในฝั่ง database
ในฝั่ง web app ใช้สำหรับการ authenticate user 

## การติดตั้งลง local environtment

```bash
git clone https://github.com/evcrboom/Instagram-clone.git
cd projectname
```
เข้าไปใน directory ของฝั่ง Frontend และ backend และติดตั้ง package ด้วย `npm install`

##การตั้งค่า PostgreSQL

ในโปรเจคนี้ได้ใช้ database เป็น postgreSQL ดังนั้นก่อน run program ให้ตั้งค่าให้เรียบร้อยก่อน

Table name: user_identify

ในแต่ละ column ประกอบด้วย id (SERIAL PRIMARY KEY), username (VARCHAR(50)), hashed_password (VARCHAR(255))

## เพิ่มเติม

ในส่วนของ backend มีการตั้งค่า port ไว้ที่ 3001 และ frontend เป็น port 3000 ตรวจสอบให้เรียบร้อยว่าไม่มีการใช้งาน port นั้นอยู่จากนั้น เขียนคำสั่ง
ลง command line `node sever.js` ในฝั่ง backend และ `npm start` ในส่วน frontend 
