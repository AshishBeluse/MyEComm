#import "React/RCTBridgeModule.h"
#import "React/RCTUtils.h"

#import <UIKit/UIKit.h>

@interface CameraModule : NSObject <RCTBridgeModule, UIImagePickerControllerDelegate, UINavigationControllerDelegate>
@property (nonatomic, strong) RCTPromiseResolveBlock resolveBlock;
@property (nonatomic, strong) RCTPromiseRejectBlock rejectBlock;
@end

@implementation CameraModule

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(openCamera:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  self.resolveBlock = resolve;
  self.rejectBlock = reject;

  UIViewController *rootViewController = RCTPresentedViewController();
  if (!rootViewController) {
    reject(@"NO_VIEW_CONTROLLER", @"No root view controller to present the camera.", nil);
    return;
  }

  UIImagePickerController *imagePickerController = [[UIImagePickerController alloc] init];
  imagePickerController.delegate = self;
  imagePickerController.sourceType = UIImagePickerControllerSourceTypeCamera;

  [rootViewController presentViewController:imagePickerController animated:YES completion:nil];
}

#pragma mark - UIImagePickerControllerDelegate Methods

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info {
  UIImage *selectedImage = info[UIImagePickerControllerOriginalImage];
  NSString *imagePath = [self saveImageToTemporaryDirectory:selectedImage];

  if (imagePath) {
    self.resolveBlock(imagePath);
  } else {
    self.rejectBlock(@"IMAGE_SAVE_ERROR", @"Failed to save the captured image.", nil);
  }

  [picker dismissViewControllerAnimated:YES completion:nil];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
  self.rejectBlock(@"CANCELLED", @"User cancelled image capture.", nil);
  [picker dismissViewControllerAnimated:YES completion:nil];
}

#pragma mark - Utility Methods

- (NSString *)saveImageToTemporaryDirectory:(UIImage *)image {
  NSData *imageData = UIImageJPEGRepresentation(image, 1.0);
  if (!imageData) {
    return nil;
  }

  NSString *tempDirectory = NSTemporaryDirectory();
  NSString *filePath = [tempDirectory stringByAppendingPathComponent:[[NSUUID UUID] UUIDString]];
  filePath = [filePath stringByAppendingPathExtension:@"jpg"];

  if ([imageData writeToFile:filePath atomically:YES]) {
    return filePath;
  }

  return nil;
}

@end
