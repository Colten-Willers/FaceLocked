from deepface import DeepFace

verification = DeepFace.verify(img1_path = "Unbenannt.PNG", img2_path = "Test.jpg", enforce_detection=False)

print(verification)