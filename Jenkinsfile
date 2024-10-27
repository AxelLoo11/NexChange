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

        stage("Start"){
            steps{     
                script {
                    sh "cd NexChange"
                    sh "tmux attach"
                    sh 'npm run build'
                    sh 'npm run start'
                }
            }  
        }
    }
}
