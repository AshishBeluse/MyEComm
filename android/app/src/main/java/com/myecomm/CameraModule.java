package com.myecomm;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class CameraModule extends ReactContextBaseJavaModule {
    private static final int CAMERA_REQUEST = 1888;
    private Promise cameraPromise;
    private Uri photoUri;

    public CameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == CAMERA_REQUEST && cameraPromise != null) {
                    if (resultCode == Activity.RESULT_OK) {
                        cameraPromise.resolve(photoUri.toString());
                    } else {
                        cameraPromise.reject("CAMERA_ERROR", "Camera operation failed or cancelled.");
                    }
                }
            }

            @Override
            public void onNewIntent(Intent intent) {
            }
        });
    }

    @NonNull
    @Override
    public String getName() {
        return "CameraModule";
    }

    @ReactMethod
    public void openCamera(Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Activity doesn't exist");
            return;
        }

        cameraPromise = promise;
        try {
            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(new Date());
            File photoFile = new File(activity.getExternalFilesDir(Environment.DIRECTORY_PICTURES),
                    "IMG_" + timeStamp + ".jpg");
            photoUri = FileProvider.getUriForFile(activity, activity.getPackageName() + ".fileprovider", photoFile);

            // Launch the camera intent
            Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

            if (intent.resolveActivity(activity.getPackageManager()) != null) {
                activity.startActivityForResult(intent, CAMERA_REQUEST);
            } else {
                promise.reject("CAMERA_ERROR", "No camera app found on the device.");
            }
        } catch (Exception e) {
            promise.reject("CAMERA_ERROR", e.getMessage());
        }
    }
}
