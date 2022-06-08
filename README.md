# 👨‍⚕️ Nodejs-server from Rg-helper app ☢️

* HEROKU LINK: https://rg-helper-back.herokuapp.com/
* HEROKU GIT: https://git.heroku.com/rg-helper-back.git
* HEROKU push: `git push heroku main`


* Start local server (development mode): `yarn dev`
* Open heroku URL: `heroku open`
* **PORT**: `5000`

## 🔗 API:

### 👥 /patients:

`GET`: get all patients  
response:
* status: `number`
* statusText: `string`
* items: `Array of PatientType`
* items: `PatientType`
  * id: `integer (number)`
  * name: `string`
  * birthyear: {year: `number | null`}
  * sex: `MAN` | `WOMAN`
  * address: `string` | `null`
  * resid: `number` (link to research)
  * description: `string` | `null`
  * conclusion: `string` | `null`
  * dateres: `Date` (unix format)

## 🌠 Per aspera ad astra ⭐ 



