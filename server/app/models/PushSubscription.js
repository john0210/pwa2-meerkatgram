/**
 * @file app/models/PushSubscription.js
 * @description pushsubscription model
 * 251120 v.1.0.0 kimjunghyun init
 */
import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'PushSubscription'; //모델명(js 내부에서 사용)


// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '푸시구독 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  endpoint: {
    field: 'endpoint',
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
    comment: '앤드포인트',
  },
    p256dh: {
    field: 'p256dh',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '공개키',
  },
  auth: {
    field: 'auth',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '인증키',
  },
  device: {
    field: 'device',
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: '디바이스',
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
  tableName: 'push_subscriptions', // 실제 db 테이블명
  timestamps: true, // createdAt, updatedAt을 자동 관리
  paranoid: true,  // soft delete 설정(deletedAt 자동 관리)
}

const PushSubscription = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    // JSON으로 serialize 시, 제외할 컬럼을 지정
    // define.prototype.toJSON = function() {
    //   const attributes = this.get();
    //   delete attributes.password;
    //   delete attributes.refreshToken;
      
    //   return attributes;
    // }


    return define;
  },

  // 모델 관계를 정의 (**여기선 자식 모델에서 설정**)
  associate: (db) => {
    db.PushSubscription.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'pushsubscription-belongs-to-user'});
  },
}
export default PushSubscription;