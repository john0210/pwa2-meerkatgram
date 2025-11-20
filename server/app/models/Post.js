/**
 * @file app/models/Post.js
 * @description post model
 * 251120 v.1.0.0 kimjunghyun init
 */
import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Post'; //모델명(js 내부에서 사용)


// 컬럼 정의
const attributes = {
id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '게시글 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '내용',
  },
  image: {
    field: 'image',
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    comment: '게시글 이미지',
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
  tableName: 'posts', // 실제 db 테이블명
  timestamps: true, // createdAt, updatedAt을 자동 관리
  paranoid: true,  // soft delete 설정(deletedAt 자동 관리)
}

const Post = {
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
  associate: (db) => {
    db.Post.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'post-belongs-to-user'});

    db.Post.hasMany(db.Like, { sourceKey: 'id', foreignKey: 'postId', as: 'post-hasmany-like' });
    db.Post.hasMany(db.Comment, { sourceKey: 'id', foreignKey: 'postId', as: 'post-hasmany-comment' });
  },
}

export default Post;