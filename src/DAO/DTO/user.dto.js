class userDTO {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.age = user.age;
    this.cartID = user.cartID;
    this.userID = user._id;
    this.profileImage = user.profileImage;
    this.isAdmin = user.role === 'admin';
    this.isPremium = user.role === 'premium';
  }
}

export default userDTO;
