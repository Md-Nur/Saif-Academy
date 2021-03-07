<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="mono.png">
    

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>Saif Academy</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }


        body {
            background-image: url('background.jpg');
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
        }

        .header {
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            height: 600px;
            font-size: 100px;
            background-size: cover;
            color: white;
            background-position: center;
            background-image: linear-gradient(-50deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url('home.jpg');
            padding: 50px;
            text-align: right;
        }

        .notice {
            display: flex;
            color: white;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            font-size: 15px;
        }

        .ntc {
            border-radius: 1px;
            padding: 3px 10px;
            background-color: rgb(100, 50, 50);
        }

        .con {

            color: white;
            text-align: justify;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5%;
            margin: 3%;
            border-radius: 5px;
        }

        .option {

            color: white;
            text-align: justify;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5%;
            margin: 3% ;
            border-radius: 5px;
        }

        .ytt {
            color: white;
            text-align: justify;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 2%;
            text-align: center;
        }

        .ytv {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }

        .ytv>iframe {
            padding: 1%;
            width: 47%;
            height: 400px;
        }

        .card {
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 2%;
            margin: 3%;
        }
        .card-body{
          text-align: justify;
        }

        footer {
            background-color: black;
        }

        .head {
            color: white;
            text-align: center;
            padding: 10px;
        }

        .hc {
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
            margin: 5%;
        }

        .footer {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }

        .footer>div {
            margin: 10px;
        }


        /* responsive */


        @media(max-width:768px) {
            .header {
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                height: 300px;
                font-size: 40px;
                background-size: cover;
                color: white;
                background-position: center;
                background-image: linear-gradient(-50deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url('home.jpg');
                padding: 25px;
                text-align: right;
            }

            .ytv>iframe {

                margin: 2%;
                width: 95%;
                height: 200px;
            }

        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a class="navbar-brand" href="#">
            <img src="logo.png" width="50" height="50" alt="Saif Academy" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#Home">Home</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#ind">Introduction</a>
                </li> 
               <li class="nav-item active dropdown">
                    <a class="nav-link dropdown-toggle" href="#more" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Batch</a>
                     <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" target="_blank" href="ssc_1.php">SSC 1</a>
                        <a class="dropdown-item" target="_blank" href="ssc_2.php">SSC 2</a>
                        <a class="dropdown-item" target="_blank" href="ssc_3.php">SSC 3</a>
                        <a class="dropdown-item" target="_blank" href="hsc_first_year_1.php">HSC First Year 1</a>
                        <a class="dropdown-item" target="_blank" href="hsc_first_year_2.php">HSC First Year 2</a>
                        <a class="dropdown-item" target="_blank" href="hsc_first_year_3.php">HSC First Year 3</a>
                        <a class="dropdown-item" target="_blank" href="hsc_second_year_1.php">HSC Second Year 1</a>
                        <a class="dropdown-item" target="_blank" href="hsc_second_year_2.php">HSC Second Year 2</a>
                        <a class="dropdown-item" target="_blank" href="hsc_second_year_3.php">HSC Second Year 3</a>
                        <a class="dropdown-item" target="_blank" href="ssc_new_1.php">SSC New 1</a>
                        <a class="dropdown-item" target="_blank" href="ssc_new_2.php">SSC New 2</a>
                        <a class="dropdown-item" target="_blank" href="ssc_new_3.php">SSC New 3</a>
                    <a class="dropdown-item" target="_blank" href="hsc_first_year_new_1.php">HSC First Year New 1</a>
                     <a class="dropdown-item" target="_blank" href="hsc_first_year_new_2.php">HSC First Year New 2</a>
                    <a class="dropdown-item" target="_blank" href="hsc_first_year_new_3.php">HSC First Year New 3</a>
                   <a class="dropdown-item" target="_blank" href="hsc_second_year_new_1.php">HSC Second Year New 1</a>
                   <a class="dropdown-item" target="_blank" href="hsc_second_year_new_2.php">HSC Second Year New 2</a>
                   <a class="dropdown-item" target="_blank" href="hsc_second_year_new_3.php">HSC Second Year New 3</a>
                       <a class="dropdown-item" target="_blank" href="other.php">Other</a>           
                        </div>              
                </li>

                <li class="nav-item active">
                    <a class="nav-link" href="form.php">Registration</a>
                </li>

                
                <li class="nav-item active">
                    <a class="nav-link" href="#ytt">Youtube Videos</a>
                </li>

                <li class="nav-item active">
                    <a class="nav-link" href="#spc">Teacher's Speech</a>
                </li>
                <li class="nav-item active dropdown">
                    <a class="nav-link dropdown-toggle" href="#more" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        More
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/groups/2630917767155071/">SSC Facebook Group</a>
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/groups/265608491419819/">HSC Facebook Group</a>
                        <a class="dropdown-item" target="_blank" href="payment.php">Payment</a>
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/md.fias.1">Teacher's
                            Facebook</a>
                        <a class="dropdown-item" target="_blank" href="https://www.facebook.com/Md.NurEAlamSiddiquee/">Developer's Facebook</a>
                    </div>
                </li>
            </ul>

        </div>
    </nav>

    <div class="header" id="Home">

        <div>Saif Academy <br>

            <a type="button" target='_blank' href='https://www.youtube.com/channel/UCAnK3gTAQXPggJT43BmEHhg' class="btn btn-danger">YouTube Chanel</a>
        </div>
    </div>

    <div class="notice">
        <div class="ntc">Notice:</div>
        <?php
        //database
        $dbcon = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        //database
        
        if ($dbcon = false) {
            echo 'Data base did not connected';
        }
        $sw = "SELECT * FROM `news` WHERE `Batch` = 'Home'";

        //database
        $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $sw); //database
        //database

        $c1 = mysqli_num_rows($r1);
        if ($c1 > 0) {
            while ($row = mysqli_fetch_row($r1)) {
        ?>
                <div style="text-align: right; width:100%">
                    <marquee><?php echo "{$row[1]}"; ?></marquee>
                </div>
        <?php

            }
        } else {
            echo 'You have no link in your database';
        }
        ?>

    </div>
    <br>
    <div class="con" id="ind">
        <h2 style="text-align: center;">Welcome To Saif Academy</h2>
        <hr>

        <p>Hello students,thanks for visiting the website. I hope you are the students of Saif Academy. Please
            scroll down and register your name and other necessary requirements. Join our facebook group where you
            will get all the information. You can see the "Facebook Group"button below the webpage or navigation
            bar. May Allah bless you. Thank you. Go ahead.</p>
    </div>

    <div class="option" id="reg">
        <h4>Registration / Edit / See Your Information</h4>
        <p>If you want to register / edit and see your information webpage then click these button.</p>
        <a class="btn btn-info" href="form.php">Registration</a>
        <a class="btn btn-info" href="dataedit.php">Show / Edit</a>
    </div>  
<br>

    <h3 class="ytt" id='ytt'>Youtube Videos</h3>
    <div class="ytv">

        <?php

        //database
        $dbcon = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        //database

        if ($dbcon  = false) {
            echo 'Data base did not connected';
        }
        $sw = "SELECT * FROM `youtube videos` ORDER BY `youtube videos`.`Serial` DESC";

        //database
        $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $sw); //database
        //database

        $c1 = mysqli_num_rows($r1);
        if ($c1 > 0) {
            while ($row = mysqli_fetch_row($r1)) {
        ?>
                <iframe src="https://www.youtube.com/embed/<?php echo "{$row[1]}"; ?> " frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <?php

            }
        } else {
            echo 'You have no link in your database';
        }
        ?>


    </div>

    <div class="card mb-3 hc" id="spc">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="sir.jpg" class="card-img" alt="Md.saifullah">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-title">Teacher's Speech:</h3>
                    <p class="card-text">Education is the backbone of the nation. Illiteracy is a curse. It hinders
                        all development efforts. Education is very necessary for all. So you should try your best to
                        get the real knowledge. English is the international language. So we should learn English
                        properly. Your cooperation and helpful manner can help me to continue teaching English. Join
                        our Facebook group. There you can get all updates of Saif Academy. Here teaching is very
                        much more than money. Thank you.</p>
                    <h4 class="card-title">Developer's Speech:</h4>
                    <p class="card-text">If there is any technical problem with this website, I, Md. Nur, are always
                        ready to help you. You can communicate with me through <a target="_blank" href="https://www.facebook.com/Md.NurEAlamSiddiquee/">Facebook</a> or <a target = "_blank" href="https://www.instagram.com/md.nurealamsiddiquee/">Instagram</a> or Google Hangouts
                        (md.nurealamsiddiquee2004@gmail.com). I will do my best to help you.</p>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="head">Copyright &copy All right reserved by Saif Academy<br> Developed by Md. Nur E Alam
            Siddiquee <br></div> <br>
        <div class="footer">
            <div class="facebook"><a class="btn btn-outline-light" target="_blank" href="https://www.facebook.com/md.fias.1" role="button">Teacher's Facebook</a></div>
             <div class="facebook"><a class="btn btn-outline-light" target="_blank" href="https://drive.google.com/drive/folders/1Dm0c5F6iZSvxa6Njn9Xyi7avoBgCxjxl?usp=sharing" role="button">Mobile App</a></div>
            <div class="facebook"><a class="btn btn-outline-light" target="_blank" href="https://www.facebook.com/Md.NurEAlamSiddiquee/" role="button">Developer's Facebook</a>
            </div>
            <div class="facebook"><a class="btn btn-outline-light" target="_blank" href="https://www.facebook.com/groups/2630917767155071/" role="button">SSC Facebook Group</a>
            </div>
            <div class="facebook"><a class="btn btn-outline-light" target="_blank" href="https://www.facebook.com/groups/265608491419819/" role="button">HSC Facebook Group</a>
            </div>
            <div class="facebook"><a class="btn btn-outline-light" target="_blank" href="payment.php" role="button">Payment</a></div>

        </div>
    </footer>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
</body>

</html>