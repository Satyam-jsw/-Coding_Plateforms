import React from 'react';
// import './css/home.css';
import {useState} from 'react'
import {NavLink,useNavigate} from 'react-router-dom';

const countries = [
    'Afghanistan',
    'Aland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo, Democratic Republic of the Congo',
    'Cook Islands',
    'Costa Rica',
    "Cote D'Ivoire",
    'Croatia',
    'Cuba',
    'Curacao',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and Mcdonald Islands',
    'Holy See (Vatican City State)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran, Islamic Republic of',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea, Democratic People's Republic of",
    'Korea, Republic of',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    `Lao People's Democratic Republic`,
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libyan Arab Jamahiriya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Macedonia, the Former Yugoslav Republic of',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova, Republic of',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestinian Territory, Occupied',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'Saint Barthelemy',
    'Saint Helena',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Serbia and Montenegro',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan, Province of China',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Viet Nam',
    'Virgin Islands, British',
    'Virgin Islands, U.s.',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];
  
const Register=()=>{
         
          const navigate=useNavigate();
          let [name,setName]=useState('');
          let [email,setEmail]=useState('');
          let [address,setAddress]=useState('');
          let [college,setCollege]=useState('');
          let [confirmPassword,setConfirmPassword]=useState('');
          let [password,setPassword]=useState('');
          let [image, setImage] = useState();

          const handleFileChange = (e) => {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
            setImage(reader.result);
            }
            
        }


          let submitForm=async (val)=>{
            val.preventDefault();
            
            let data={name,email,password,confirmPassword,image,address,college};
            
            const response=await fetch("https://coding-platform-bitcode.vercel.app/userregister",{
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body:JSON.stringify(data)
            });
           const result=await response.json();
           if(response.status===400)
           {
            window.alert(result.messageToUser);
            
           }
           else
           {
            const response=await fetch("https://coding-platform-bitcode.vercel.app/userlogin",{
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
              });
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAddress('');
            setImage('');
            setCollege('');
            window.alert(result.messageToUser);
            navigate('/');
           }
          }
          
  return (
    <>
    <div className="container ">
       <div className="d-flex justify-content-center align-center h-100">
           <div className="card">
               <div className="card-header">
                   <h3>Sign Up</h3>
               </div>
               
               <div className="card-body">
                   <form >
                   <div className="input-group form-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"> 
                               <i className="fas fa-user"></i> </span>
                           </div>
                           <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} placeholder="Username"/>
                       </div>

                       <div className="input-group form-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text">
                                  <i className="fas fa-envelope"></i> </span>
                           </div>
                           <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"/>
                       </div>

                       <div className="input-group form-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text">
                               <i class="fa fa-map-marker"></i>
                                </span>
                           </div>
                           <select className="form-select" onClick={(e) =>{setAddress(e.target.value);}} id="country" name="country">
                            {countries.map((val)=>
                                    <option value={val}>{val}</option>
                                )}
                           </select>
                       </div>
                       <div className="input-group form-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"> 
                               <i className="fas fa-university"></i> </span>
                           </div>
                           <input type="text" className="form-control" onChange={(e) => { setCollege(e.target.value) }} placeholder="College/University"/>
                       </div>
                       <div className="input-group form-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text">
                                  <i className="fas fa-key"></i> </span>
                           </div>
                           <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"/>
                       </div>
                       <div className="input-group form-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"> 
                               <i className="fas fa-key"></i> </span>
                           </div>
                           <input type="password" className="form-control" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Re-enter Password"/>
                       </div> 
                       <input type="file" onChange={handleFileChange} />
                       <p>image size will be less than 50kB</p>
                       {image && <p>{image.name}</p>}              
                       <div className="form-group">
                           <input type="submit"  value="Register" className="btn float-right login_btn" onClick={submitForm}/>
                       </div>
                   </form>
               </div>
               <div className="card-footer">
                 <div className="d-flex justify-content-center links ">
                   Already Registered?
                     <NavLink to={"/login"}>Log in</NavLink>
                 </div>
       </div>
           </div>
       </div>
   </div>
   </>
  );
}
export default Register;