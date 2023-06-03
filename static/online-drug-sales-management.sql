/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/5/20 10:57:22                           */
/*==============================================================*/


-- 创建数据库
create database odsm;

use odsm;

drop table if exists cart;

drop table if exists drug;

drop table if exists master;

drop table if exists orderTable;

drop table if exists supplier;

drop table if exists user;

/*==============================================================*/
/* Table: cart (购买表)                                           */
/*==============================================================*/
create table cart
(
  -- 购买信息id
  bid   varchar(32) not null,
  -- 用户id
  uid   varchar(32),
  -- 药品id
  did   varchar(32),
  -- 购买数量
  count int,
  primary key (bid)
)
  ENGINE = innodb
  default charset = UTF8;

/*==============================================================*/
/* Table: DrugTemp (药品表)                                      */
/*==============================================================*/
create table drug
(
  -- 药品id
  did       varchar(32) not null,
  -- 药品名
  name      varchar(30),
  -- 封面
  cover     text,
  -- 价格
  price     float,
  -- 类型
  type      varchar(100),
  -- 分类
  sort      varchar(100),
  -- 性状
  traits    varchar(600),
  -- 主治功能
  function  text,
  -- 规格
  format    varchar(100),
  -- 储存方式
  store     varchar(100),
  -- 用法用量
  eat       text,
  -- 不良反应
  bad       text,
  -- 禁忌
  ban       text,
  -- 注意事项
  note      text,
  -- 生产厂商(供应商的名称)
  company   varchar(100),
  -- 保质期
  shelfLife varchar(100),
  -- 库存
  count     bigint,
  primary key (did)
)
  ENGINE = innodb
  default charset = UTF8;

/*==============================================================*/
/* Table: master (管理员表)                                      */
/*==============================================================*/
create table master
(
  -- 管理员id
  mid      varchar(32) not null,
  -- 账号
  account  varchar(16),
  -- 密码
  password varchar(32),
  primary key (mid)
)
  ENGINE = innodb
  default charset = UTF8;

/*==============================================================*/
/* Table: orderTable (订单表)                                    */
/*==============================================================*/
create table orderTable
(
  -- 订单id
  oid      varchar(32) not null,
  -- 供应商id
  sid      varchar(32),
  -- 药品名
  name     varchar(30),
  -- 总价格
  price    float,
  -- 订购数量
  count    int,
  -- 订购日期
  date     varchar(30),
  -- 是否验收
  isAccept tinyint,
  primary key (oid)
)
  ENGINE = innodb
  default charset = UTF8;

/*==============================================================*/
/* Table: supplier (供应商表)                                    */
/*==============================================================*/
create table supplier
(
  -- 供应商id
  sid     varchar(32) not null,
  -- 供应商名
  name    varchar(30),
  -- 手机号
  phone   varchar(11),
  -- 地址
  address varchar(120),
  primary key (sid)
)
  ENGINE = innodb
  default charset = UTF8;

/*==============================================================*/
/* Table: user (用户表)                                          */
/*==============================================================*/
create table user
(
  -- 用户id
  uid      varchar(32) not null,
  -- 名称
  name     varchar(30),
  -- 手机号
  phone    varchar(11),
  -- 密码
  password varchar(32),
  -- 地址
  address  varchar(120),
  primary key (uid)
)
  ENGINE = innodb
  default charset = UTF8;

alter table cart
  add constraint FK_Reference_1 foreign key (uid)
    references user (uid) on delete restrict on update restrict;

alter table cart
  add constraint FK_Reference_2 foreign key (did)
    references drug (did) on delete restrict on update restrict;

alter table orderTable
  add constraint FK_Reference_3 foreign key (sid)
    references supplier (sid) on delete restrict on update restrict;

-- 插入供应商数据
insert into supplier
values ('1', '张伟', '13843850381', '广东白云学院医药处'),
       ('2', '军勇', '13843850382', '北京生物医药制造中心');

-- 插入订单数据
insert into ordertable
values ('1', '2', '伸腿瞪眼丸', 9.9, 100, '2022-05-24', 0);