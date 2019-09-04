# Self signed certificates
Our backend app will run on `https://localhost:4000`. We need to run it over a secure connection using `https` in order to make it the most similar to the production environment to avoid possible inconsistencies and eventual errors.
To run the app over a secure connection locally you need self signed certificates. We do have some tools to create them. Got to `ssl/tools` and run:

```
sh create_root_cert_and_key.sh
sh create_certificate_for_domain.sh localhost localhost
```

This is going to create several files into the same directory where this sh files are. Your file system will look like this:

![SelfSignedCertsTool](http://res.cloudinary.com/yoinbol-dgarcia/image/upload/v1505843888/Screen_Shot_2017-09-19_at_11.53.16_AM_t5k9ac.png)

Once you have all those new files, go to your Keycahin Access to import some of them

![KeychainAccess](http://res.cloudinary.com/yoinbol-dgarcia/image/upload/v1505844059/Screen_Shot_2017-09-19_at_12.00.15_PM_uiaptl.png)

NOTE: probably just after you import this two items, one of them will have a red cross over it. Don't get panic. This will be resolved on the next steps.

Go to the to menu `File -> Import Items` and import this two items, in this order:
- rootCA.pem
- localhost.crt

Once you are with this, you will see two new entries called 'localhost' in your Keychain Access tool. Double click on each of them, this will open a new window like this:

![TrustAlways](http://res.cloudinary.com/yoinbol-dgarcia/image/upload/v1505844401/Screen_Shot_2017-09-19_at_12.05.35_PM_b1j3ob.png)

For both certificates, expand the `Trust` node and on the very first option called `When using this certificate` select `Always Trust`. You will be prompted for your local password to save this.

Finally, copy `localhost.crt` and `device.key` files into `ssl/certs` (create the `certs` directory if it doesn't exists). The configuration of the local node app is going to look for this file into this location in order to sign the app with the self signed certificate you just created and be able to serve the app over https with no warning/error messages on the browser.

### Run the app
Finally, if the previous septs are in place, you should be able to run `yarn start-local` and then be able to see the app on `https://localhost:4000` (`https://localhost:4000/graphql` for the GraphQL testing tool)