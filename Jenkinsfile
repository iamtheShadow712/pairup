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
        stage("Checkout Code"){
            steps{
                checkout scm
            }
        }
        stage("Start Build"){
            parallel{
                stage("Frontend"){
                    stages{
                        stage("Install Dependencies"){
                            steps{
                                dir("./frontend"){
                                    sh "npm install --no-audit"
                                }
                            }
                        }
                        stage("Audit Dependencies"){
                            steps{
                                dir("./frontend"){
                                    sh "npm audit --audit-level=high"
                                }
                            }
                        }
                    }
                }
                stage("Backend"){
                    stages{
                        stage("Install Dependencies"){
                            steps{
                                dir("./backend"){
                                    sh "npm install --no-audit"
                                }
                            }
                        }
                        stage("Audit Dependencies"){
                            steps{
                                dir("./backend"){
                                    sh "npm audit --audit-level=high"
                                }
                            }
                        }    
                    }
                }
            }
        }
    }
}