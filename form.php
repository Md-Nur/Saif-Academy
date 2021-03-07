<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="mono.png">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- My Css -->
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            background-image: url("background.jpg");
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
        }

        .htitle {
            padding: 20px 5%;
            margin: 20px 5%;
            border-radius: 10px;
            background-color: rgba(00, 0, 0, 0.5);
            color: white;
            text-align: center;
        }

        form {
            padding: 20px 5%;
            margin: 20px 5%;
            border-radius: 10px;
            background-color: rgba(00, 0, 0, 0.5);
        }

        form>div>label {
            color: white;
        }

        .form-control:focus {
            color: white;
            background-color: rgba(00, 00, 00, 0.8)
        }
    </style>
    <!-- My Css -->

    <title>Form</title>

</head>

<body>
     <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a class="navbar-brand" href="#">
            <img src="logo.png" width="50" height="50" alt="Registration" loading="lazy">
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


    <!-- Registration Form -->
    <?php
    if (isset($_REQUEST['s1'])) {

        $nm = $_REQUEST['nm'];
        $pn = $_REQUEST['pn'];
        $el = $_REQUEST['el'];
        $psd = $_REQUEST['psd'];
        $sc = $_REQUEST['sc'];
        $bth = $_REQUEST['bth'];
        $gr = $_REQUEST['gr'];

        //Data base connection
        $dbc1 = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
        // data base connection

        if ($dbc1 = false) {
            echo 'Data base did not connected';
        }
//INSERT INTO `all info` (`Roll`, `Full Name`, `Phone`, `Email`, `Password`, `School / College`, `Batch`, `Gender`, `Joining Date`) VALUES (NULL, '$nm', '$pn', '$el', '$psd', '$sc', '$bth', '$gr', current_timestamp())

        $q1 = "INSERT INTO `all info` (`Roll`, `Full Name`, `Phone`, `Email`, `Password`, `School / College`, `Batch`, `Gender`, `Joining Date`) VALUES (NULL, '$nm', '$pn', '$el', '$psd', '$sc', '$bth', '$gr', current_timestamp())";

        $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $q1);



        echo "<h1 class='htitle'>";
        if($r1=true){
        
 $s0 = "SELECT * FROM `all info` WHERE `Phone` = '$pn'";

        //database
        $r0 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $s0); //database
        //database

        $c0 = mysqli_num_rows($r0);
        if ($c0 > 0) {
            while ($row = mysqli_fetch_row($r0)) {
            echo "Your Roll: ";
        echo "{$row[0]}";

            }
        } else {
            echo 'You have no data';
        };


        } else {
            echo "Your data is not inseted";
        }
        echo "</h1>";
    };

    ?>


    <form action='' method='post'>
        <h2 style="text-align:center; color:white">Registration Form:</h2><br>
        <div class="form-group">
            <label for="inputAddress">Full Name</label>
            <input type="text" required name='nm' class="form-control" required placeholder="Full Name">
        </div>
        <div class="form-group">
            <label>Phone Number</label>
            <input type="Number" required name='pn' class="form-control" required placeholder="Your phone number must be unique." maxlength="11" size="11">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" name='el' required placeholder="Your phone number must be unique." class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Create a Password</label>
            <input type="password" required name='psd' class="form-control" id="exampleInputPassword1" placeholder="Your password length should be 6-10" maxlength="10" size="10">
        </div>

        <div class="form-group">
            <label for="exampleFormControlSelect1">School / College Name</label>
            <select class="form-control" required name='sc' id="exampleFormControlSelect1">
                <option>Select Your School/College</option>
                <?php

                //database
                $con = mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'); //database
                //database

                if ($con = false) {
                    echo 'Data base did not connected';
                }
                $sw = "SELECT * FROM `school/college` ORDER BY `school/college`.`S&C` ASC";

                //database
                $r1 = mysqli_query(mysqli_connect('sql211.epizy.com', 'epiz_26217239', 'TKBIknMihTE6', 'epiz_26217239_Saif_Academy'), $sw); //database
                //database

                $c1 = mysqli_num_rows($r1);
                if ($c1 > 0) {
                    while ($row = mysqli_fetch_row($r1)) {
                ?>
                        <option><?php echo "{$row[1]}"; ?></option>
                <?php

                    }
                } else {
                    echo 'You have no link in your database';
                }
                ?>
                <option>Other</option>
            </select>
        </div>

        <div class="form-group">
            <label for="exampleFormControlSelect1">Batch</label>
            <select class="form-control" required name='bth' id="exampleFormControlSelect1">
                <option>Select Your Batch</option>
                <option>SSC 1</option>
                <option>SSC 2</option>
                <option>SSC 3</option>
                <option>SSC New 1</option>
                <option>SSC New 2</option>
                <option>SSC New 3</option>
                <option>HSC First Year 1</option>
                <option>HSC First Year 2</option>
                <option>HSC First Year 3</option>
                <option>HSC First Year New 1</option>
                <option>HSC First Year New 2</option>
                <option>HSC First Year New 3</option>
                <option>HSC Second Year 1</option>
                <option>HSC Second Year 2</option>
                <option>HSC Second Year 3</option>
                <option>HSC Second Year New 1</option>
                <option>HSC Second Year New 2</option>
                <option>HSC Second Year New 3</option>
                <option>Other</option>
            </select>
        </div>

        <div class="form-group">
            <label for="exampleFormControlSelect1">Gender</label>
            <select class="form-control" required name='gr' id="exampleFormControlSelect1">
                <option>Select Your Gender</option>
                <option>Male</option>
                <option>Female</option>
            </select>
        </div>

        <br>
        <div class="form-group form-check">
            <input type="checkbox" required class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" f style="color:white">I am a sutdent of saif academy. I will abide by all the rules of Saif Academy</label>
        </div>

        <input type="submit" name='s1' class="btn btn-outline-light">
        <input type="reset" class="btn btn-outline-danger" value='Clear'><br>
    </form>

    <!-- Registration Form -->


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
    <!-- Optional JavaScript -->

</body>

</html>