pipeline{
    agent any;

    stages{
        stage("Checkout Repository"){
            steps{
                echo "Repository Checkout"
            }
        }
    }
    post{
        success{
            steps{
                echo "Pipeline successfull"
            }
        }
        failure{
            steps{
                echo "Pipeline failed"
            }
        }
    }
}