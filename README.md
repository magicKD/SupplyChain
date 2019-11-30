# 基于区块链的供应链金融平台 

| 年级     | 2017        | 专业（方向） | 软件工程          |
| -------- | ----------- | ------------ | ----------------- |
| 学号     | 17343008    | 姓名         | 陈灿辉            |
| 电话     | 13580900798 | Email        | 1178160567@qq.com |
| 开始日期 | 2019-11-15  | 完成日期     | 2019-12-13        |

## 运行环境

借助Fisco-bcos的WeBase进行开发

Fisco-bcos运行环境：Ubuntu 18.04.3

前端开发环境：Windows 10

区块链框架：Fisco-bcos + Webase

前端框架：Vue + element-ui

服务端框架：node + Express

密码学技术：基于`eth-crypto` 的数字签名，基于`paillier`算法的同态加密

详细细节请参见Report下的报告，以及相对应的代码

运行步骤：

1. 先在Ubuntu 系统中启动FiscoBcos服务，并且启动WeBase服务，详情请参考https://webasedoc.readthedocs.io/zh_CN/latest/docs/WeBASE-Console-Suit/index.html

2. 若是使用虚拟机跑Fisco-Bcos环境，使用Windows进行开发，请先设置虚拟机网络连接为桥接模式，并且查看Fisco-BCOS的IP地址，以及WeBase运行的前端端口。然后在/Server/文件夹下找到fisco_bcos_api.js文件，修改器文件的相关配置信息，IP地址，端口等

   ```javascript
   var ipAddress = "172.19.60.62";
   var port = 7002;
   ```

3. 将contracts/文件夹下的合约文件通过Webase部署到Fisco-bcos链上

4. 在`前后端代码/`的文件夹下，先运行如下命令，来安装相对应的包依赖

   ```
   npm install
   ```

   安装好依赖后需要开启两个终端，在其中一个终端输入以下命令

   ```bash
   node ./app.js
   ```

   来启动服务端，同时在另外一个终端上输入

   ```
   npm run dev
   ```

   来启动前端，启动完毕会访问http://localhost:8080/#/ 即可进入页面。注意到3000端口和8080端口不应该被占用，如被占用，请情调相对应的进程或者修改相对应的端口。

