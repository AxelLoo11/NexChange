pipeline {
    agent any

    environment {
        MYSQL_PASSWORD = credentials('NEXCHANGE_USERSERVICE_MYSQL_PASSWORD') // stored in Jenkins Server
        JWT_SECRET = credentials('NEXCHANGE_USERSERVICE_JWT_SECRET') // stored in Jenkins Server
        DOCKER_CREDENTIALS = 'docker_hub_credentials' // stored in Jenkins Server
        DOCKER_IMAGE = "jmx7139/nexchange-postservice"
    }

    parameters {
        string(name: 'JAR_NAME', defaultValue: 'NexChange-PostService', description: 'The name of the JAR file')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

    //     stage("Start") {
    //         steps {     
    //             script {
    //                 sh "cd $WORKSPACE/NexChange"
    //                 sh "tmux attach"
    //                 sh 'npm run build'
    //                 sh 'npm run start'
    //             }
    //         }  
    //     }

    //     stage('Build Project') {
    //         steps {
    //             // 构建Next.js项目
    //             sh 'npm run build'
    //         }
    //     }

    //     stage('Stop Existing Application') {
    //         steps {
    //             // 检查并停止占用3000端口的进程
    //             sh 'lsof -i :3000 && kill $(lsof -t -i :3000) || echo "No process running on port 3000"'
    //         }
    //     }

    //     stage('Start New Application') {
    //         steps {
    //             // 启动新的Next.js应用
    //             sh 'npm run start &'
    //         }
    //     }
    // }

    // post {
    //     success {
    //         echo 'Deployment successful!'
    //     }
    //     failure {
    //         echo 'Deployment failed.'
    //     }
    // }
}
