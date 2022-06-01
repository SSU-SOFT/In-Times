# In-Times 

![인타임즈1](https://user-images.githubusercontent.com/18747983/171442934-b80586bf-76f4-48f5-a5f2-1c31de41d076.png)

## 프로젝트 소개

InTimes는 뉴스 빅데이터에서 중요한 사건들을 자동으로 탐지하고, 사건에 해당하는 뉴스 기사들을 모아 보여주는 웹 사이트 입니다.


## 프로젝트 동기

정보 통신 기술의 발달로 다양한 분야에서의 사건(event)이나 이슈(issue)들이 인터넷에 보도되면서, 개인이 접근할 수 있는 정보의 양은 많아졌습니다. 그러나 개인이 유용한 정보를 얻기 위해서는 많은 노력을 필요로 하므로 뉴스 기사를 효과적으로 검색하고 검색된 정보 중에서 적합한 정보를 선별하는 방법에 대한 중요성이 더욱 커지고 있습니다. 즉, 방대한 뉴스 기사 데이터로부터 중요한 사건들을 자동으로 탐지하고 요약하여 제공하는 도구가 존재한다면, 사용자들은 정보를 획득하는데 시간을 절약하고 사회적 흐름을 이해하는 데 많은 도움을 받을 수 있을 것이라고 생각하여, 다음과 같은 사이트를 제작하였습니다.

![인타임즈2](https://user-images.githubusercontent.com/18747983/171442941-568d2477-d459-4df5-9310-e6b9f34149a3.png)
![인타임즈3](https://user-images.githubusercontent.com/18747983/171442947-bea5ddc8-38c2-48cf-a7ed-27ade2d69e2d.png)
![인타임즈4](https://user-images.githubusercontent.com/18747983/171442951-2a605095-10cd-4d20-b69e-603fc8bc8183.png)

## PR방식

- git checkout main (메인 브랜치)
- git pull (깃헙 원격 저장소와 업데이트)
- git checkout -b 기능_이름 (새로운 브랜치 생성 영어가 좋을듯!)
- 기능 개발 후 변경된 파일 add - commit - push
- push하면 브랜치가 upstream 되지 않았다고 나올 것 이 때 터미널에 뜨는 명령어 복붙<br/>
ex) git push --set-upstream origin update_README
- 깃 저장소의 Pull requests 탭에서 Compare & pull request 클릭
- 팀원과 회의 후 Merge
- git branch -D feature/TEST-860 (로컬에 생성된 브랜치 삭제)
- git push origin --delete feature/TEST-860 (원격 저장소에 생성된 브랜치 삭제)
