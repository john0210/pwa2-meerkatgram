/** 
* @file databases/seeders/dummy-users.seeder.js
  @description users table dummy data create
  251118 v1.0.0 kimjunghyun init 
*/

import bcrypt from 'bcrypt';


// 테이블명
const tableName = 'users';
// 레코드 정보
const records = [
  {
    email: 'admin@admin.com',
    password: bcrypt.hash('admin', 10),
  },
];



/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
      email: 'admin@admin.com',
      password: await bcrypt.hash('qwe12312', 10),
      nick: '미어캣관리자',
      provider: 'NONE',
      role: 'SUPER',
      profile: '',
      created_at: new Date(),
      updated_at: new Date(),
      },
      {
      email: 'admin2@admin.com',
      password: await bcrypt.hash('qwe12312', 10),
      nick: '미어캣관리자2',
      provider: 'KAKAO',
      role: 'NOMAL',
      profile: '',
      created_at: new Date(),
      updated_at: new Date(),
      },
    ];
    // 데이터 생성
    await queryInterface.bulkInsert(tableName, records, {});
  },

  async down (queryInterface, Sequelize) {
  // 데이터 삭제 (table, records, options) 
  await queryInterface.bulkDelete(tableName, null, {});    
  }
};
