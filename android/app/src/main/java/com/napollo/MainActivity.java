package com.napollo;

import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  //SPALSH SCREEN
  @Override
  protected void onCreate(Bundle savedInstanceState){
//    SplashScreen.show(this,R.style.SplashScreenTheme);
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }

// REACTnAVIGATION
  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  // super.onCreate(null);
  // }


  @Override
  protected String getMainComponentName() {
    return "Napollo";
  }
}
