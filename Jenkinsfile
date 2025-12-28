pipeline{
    agent any;

    tools{
        nodejs "nodejs-24.0.0"
    }

    options{
        skipDefaultCheckout true
        retry(5)
    }

    stages{
        stage("Checkout Repository"){
            steps{
                checkout scm
            }
        }
        stage("Node version"){
            steps{
                sh 'node --version'
                sh 'npm --version'
            }
        }
    }
    post{
        success{
            echo "Pipeline successfull"
        }
        failure{
            echo "Pipeline failed"
        }
    }
}