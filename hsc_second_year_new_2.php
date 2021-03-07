<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="mono.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>HSC Second Year New 2</title>
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
            align-items: center;
            justify-content: center;
            height: 600px;
            font-size: 100px;
            background-size: cover;
            color: white;
            background-position: center;
            background-image: radial-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url('bh.jpg');
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
            padding: 2%;
            margin: 3%;
            border-radius: 5px;
        }

        .option {

            color: white;
            text-align: justify;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 2%;
            margin: 3% ;
            border-radius: 5px;
        }
        .ytv{
            text-align: center;
            width: 99% ;
        }

        .ytt {
            color: white;
            text-align: justify;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 2%;
            text-align: center;
        }


        .card {
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 2%;
            margin: 3%;
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
                align-items: center;
                justify-content: center;
                height: 300px;
                font-size: 40px;
                background-size: cover;
                color: white;
                background-position: center;
                background-image: radial-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url('bh.jpg');
                padding: 25px;
                text-align: right;
            }

            .ytv>iframe {
               text-align: center;
                width: 99%;
            }


        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a class="navbar-brand" href="#">
            <img src="logo.png" width="30" height="30" alt="HSC Second Year New 2" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.php">Home</a>
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
                    <a class="nav-link" href="#xm">Exam</a>
                </li>

                
                <li class="nav-item active">
                    <a class="nav-link" href="#result">Result</a>
                </li>

                <li class="nav-item active">
                    <a class="nav-link" href="https://us04web.zoom.us/j/7650312464?pwd=VGllYUN5c1ZIWCtmSkFvOGVIdnNaZz09" target="_blank">Join zoom meeting</a>
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

        <div>HSC Second Year New 2</div>
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
        $sw = "SELECT * FROM `news` WHERE `Batch` = 'HSC Second Year New 2'";

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
    
    <div class="option" id="reg">
        <h4>About This Batch</h4>
        <?php 

//database
        $dbcon5 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        //database
        
        if ($dbcon5 = false) {
            echo 'Data base did not connected';
        }
        $sw5 = "SELECT * FROM `news` WHERE `Batch` = 'HSC Second Year New 2'";

        //database
        $r5 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $sw5); //database
        //database

        $c5 = mysqli_num_rows($r5);
        if ($c5 > 0) {
            while ($row = mysqli_fetch_row($r5)) {
        ?>
                <div>
                    <p><?php echo "{$row[3]}"; ?></p>
                </div>
        <?php

            }
        } else {
            echo 'You have no link in your database';
        }


         ?>
       
    </div>  
<br>
<!--result-->

    <h3 class="ytt" id='result'>Result</h3>
    <div class="ytv">


<table class="table table-striped table-dark">
  <tbody>

<?php
      //database
        $data = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        //database

        if ($data = false) {
            echo 'Data base did not connected';
        }
        $show = "SELECT * FROM `z_hsc_second_year_new_2`";

        //database
        $r2 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $show); //database
        //database

        $c2 = mysqli_num_rows($r2);
        if ($c2 > 0) {
            while ($row = mysqli_fetch_row($r2)) {
?>
   <tr>
      <th scope="row"><?php echo "{$row[4]}"; ?></th>
      <td><?php echo "{$row[3]}"; ?></td>
      <td><?php echo "{$row[2]}"; ?></td>
      <td><?php echo "{$row[0]}"; ?></td>
    </tr>
 
<?php
            }
        } else {
            echo 'You have no link in your database';
        }
        ?>
 </tbody>
</table>
    </div>





<!--Exam-->

    <h3 class="ytt" id='xm'>Exam</h3>
    <div class="ytv">
<?php

        //database
        $dbcon = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        //database

        if ($dbcon  = false) {
            echo 'Data base did not connected';
        }
        $sw = "SELECT * FROM `news` WHERE `Batch` = 'HSC Second Year New 2'";

        //database
        $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $sw); //database
        //database

        $c1 = mysqli_num_rows($r1);
        if ($c1 > 0) {
            while ($row = mysqli_fetch_row($r1)) {
        echo "{$row[2]}";

            }
        } else {
            echo 'You have no link in your database';
        };
        ?>
    </div>

                                                               <!--Exam-->
                                                               
    <footer>
        <div class="head">Copyright &copy All right reserved by Saif Academy<br> Developed by Md. Nur E Alam
            Siddiquee <br></div> <br>
        <div class="footer">
            <div class="facebook"><a class="btn btn-outline-light" target="_blank" href="https://www.facebook.com/md.fias.1" role="button">Teacher's Facebook</a></div>
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