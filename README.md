## 구글맵 키

Google API Console:
https://console.developers.google.com/?project=navylab-1480917543332

Google Map API Key:
AIzaSyAXexg6w9S0JwzFMt5iQqxKSlnH5tH1kS0

## 설치 및 실행

### 첫 설치하기 (Mac OS X)

1. Mac OS X에서 "터미널" 프로그램을 열고, 프로젝트를 다운 받을 폴더로 들어간다. 예를 들어 Desktop에 설치하고 싶다면 아래 커맨드를 입력한다.
  ```sh
  cd ~/Desktop
  ```

2. github에서 프로젝트를 아래 커맨드를 통해 "Clone" (다운로드 및 git 설정)한다.
  ```sh
  git clone https://github.com/navylab/portfolio
  ```

3. Desktop에 portfolio란 폴더가 생겼을 것이다.
  ```sh
  cd ~/Desktop/portfolio/
  ```

4. 필요한 외부 모듈을 설치한다.
  ```sh
  npm install
  ```

  아래 npm 커맨드가 오류가 난다면 Mac OS X에 Node가 설치가 안돼 있을 것이다. https://nodejs.org 에서 v5.6.0 혹은 최신 버젼을 다운 받아 설치 후 아래 커맨드를 실행한다.
  
  자세히 설명하면 npm install 커맨드는 portfolio 속의 package.json 파일에 나열된 외부 모듈들을 node_modules 폴더 안에 설치한다.

### 빌드 및 개발 모드 실행

1. portfolio 폴더로 들어간다.
  ```sh
  # 예. portfolio 폴더가 Desktop에 있다고 가정
  cd ~/Desktop/portfolio/
  ```

2. 앱을 실행 후 개발 모드로 들어간다.
  ```sh
  npm start
  ```

  자세히 설명하면 package.json 속의 start에 적혀있는 커맨드를 실행한다.

3. 터미널의 개발 모드에서 아래 단축키를 차례대로 눌러 빠져나간다.

  가. Mac OS X 기준 키보드 왼쪽 아래 control키를 누르고 지속한다.

  나. control키를 누른 상태에서 x키 누르고,

  다. control키를 누른 상태에서 c키를 눌러 종료.
