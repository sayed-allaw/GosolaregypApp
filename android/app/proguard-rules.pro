# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Firebase
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# React Native
-keep class com.facebook.** { *; }
-dontwarn com.facebook.**

# Keep native methods
-keepclasseswithmembers class ** {
    native <methods>;
}

# Keep React Native specific classes
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Keep annotations
-keep class * extends java.lang.annotation.Annotation { *; }

# Keep classes used by Gson (if you're using Gson for JSON)
-keep class **.model.** { *; }
-keep class **.data.** { *; }

# Keep React Native modules
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.views.** { *; }

# Keep AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Keep NetInfo
-keep class com.reactnativecommunity.netinfo.** { *; }

# Keep Navigation
-keep class com.reactnavigation.** { *; }
-keep class com.swmansion.** { *; }

# Keep Redux
-keep class com.redux.** { *; }

# Keep moment.js
-keep class moment.** { *; }

# Keep all classes in your app package
-keep class com.gosolaregypt.** { *; }

# Keep JavaScript interface
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod *;
}

# Keep all classes that might be used by reflection
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes Exceptions

# Keep all classes with @Keep annotation
-keep @androidx.annotation.Keep class * {*;}

# Keep all classes in the main package
-keep class com.gosolaregypt.MainActivity { *; }
-keep class com.gosolaregypt.MainApplication { *; }