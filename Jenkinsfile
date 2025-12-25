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
            echo "Pipeline successfull"
        }
        failure{
            echo "Pipeline failed"
        }
    }
}