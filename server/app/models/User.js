/**
 * @file app/models/User.js
 * @description user model
 * 251120 v.1.0.0 kimjunghyun init
 */
import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'User'; //모델명(js 내부에서 사용)


// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '유저 PK',
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '이메일(로그인ID)'
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '비밀번호',
  },
  nick: {
    field: 'nick',
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    comment: '닉네임'
  },
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자(NONE, KAKAO, GOOGLE...)'
  },
  role: {
    field: 'role',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '유저 권한(NOMAL, SUPER...)'
  },
  profile: {
    field: 'profile',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '유저 프로필',
  },
  refreshToken: {
    field : 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레시 토큰',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

const options = {
  tableName: 'users', // 실제 db 테이블명
  timestamps: true, // createdAt, updatedAt을 자동 관리
  paranoid: true,  // soft delete 설정(deletedAt 자동 관리)
}

const User = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    // JSON으로 serialize 시, 제외할 컬럼을 지정
    define.prototype.toJSON = function() {
      const attributes = this.get();
      delete attributes.password;
      delete attributes.refreshToken;
      
      return attributes;
    }


    return define;
  },
  // 모델 관계를 정의 (**여기선 자식 모델에서 설정**)
  associate: (db) => {
    // 1:n 관계 부모 모델에 설정하는 방법 (1명의 사원은 복수의 직급 정보를 가진다.)
    db.User.hasMany(db.Like, { sourceKey: 'id', foreignKey: 'userId', as: 'user-hasmany-like' });
    db.User.hasMany(db.Post, { sourceKey: 'id', foreignKey: 'userId', as: 'user-hasmany-post' });
    db.User.hasMany(db.Comment, { sourceKey: 'id', foreignKey: 'userId', as: 'user-hasmany-comment' });
    db.User.hasMany(db.PushSubscription, { sourceKey: 'id', foreignKey: 'userId', as: 'user-hasmany-pushsubscription' });
    db.User.hasMany(db.Notification, { sourceKey: 'id', foreignKey: 'userId', as: 'user-hasmany-notification' });
  },
}

export default User;