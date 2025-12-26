# 초기 생성 모드
FROM node:20

WORKDIR /app

# 기본 패키지
RUN apt-get update && \
    apt-get install -y tmux openssh-server sudo && \
    rm -rf /var/lib/apt/lists/*

# SSH 데몬이 필요로 하는 디렉터리 생성
RUN mkdir /var/run/sshd

# 개발용 계정 생성 (아이디: dev, 비밀번호: 직접 바꾸기)
RUN useradd -m yhpark && echo 'yhpark:1234' | chpasswd && adduser yhpark sudo

# 비밀번호 로그인 허용(내부망 전용/테스트용, 실제로는 키 기반 권장)
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# SSH 포트 열기
EXPOSE 22

# 컨테이너 기본 프로세스로 sshd 실행
CMD ["/usr/sbin/sshd", "-D"]