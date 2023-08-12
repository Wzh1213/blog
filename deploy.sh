# 通过 git config --global alias.ch 设置
git config --global alias.ch checkout

# 根目录新建一个deploy.sh文件
#!/bin/bash

git ch -b temp
yarn
yarn build
# 创建一个临时目录用于保存构建生成的静态文件
mkdir temp_deploy

# 将构建生成的静态文件复制到临时目录
cp -r docs/.vitepress/dist/* temp_deploy

find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' ! -name 'temp_deploy' -exec rm -rf {} \;
git add .
git commit -m "deploy"

git ch main

find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;

git add .
git commit -m "deploy"

git merge temp

find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.gitignore' ! -name 'temp_deploy' -exec rm -rf {} \;

mv temp_deploy/* .

rm -rf temp_deploy

git add .
git commit -m 'deploy'
git push

git branch -D temp
git ch -b master