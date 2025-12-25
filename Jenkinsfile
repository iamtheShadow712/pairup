pipeline{
    agent any;

    tools{
        nodejs "node-24.0.0"
    }

    stages{
        stage("Checkout Repository"){
            steps{
                echo "Repository Checkout"
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