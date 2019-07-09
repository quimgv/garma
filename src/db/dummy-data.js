const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Favour = require('../../src/models/favour')
const FavourRequest = require('../../src/models/favourRequests')

///////////////////
////// USERS //////
///////////////////

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Quim',
    email: 'quim@test.com',
    password: 'test123',
    score: 100,
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
}

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: 'Ana',
    email: 'ana@test.com',
    password: 'test123',
    score: 50,
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET)
    }]
}

const userThreeID = new mongoose.Types.ObjectId()
const userThree = {
    _id: userThreeID,
    name: 'Lorena',
    email: 'lore@test.com',
    password: 'test123',
    score: 15,
    tokens: [{
        token: jwt.sign({ _id: userThreeID }, process.env.JWT_SECRET)
    }]
}

//////////////////////
////// FAVOURS ///////
//////////////////////

const favourOneID = new mongoose.Types.ObjectId()
const favourOne = {
    _id: favourOneID,
    title: 'Favour one Quim',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem mi, hendrerit sit amet sapien eu, iaculis imperdiet neque. Pellentesque pharetra massa elit, quis sodales magna fringilla in. Aenean dictum nunc eget neque congue aliquam a quis diam. Pellentesque vel vestibulum libero. Etiam non magna eget nunc faucibus eleifend sed mollis magna. Vestibulum dictum purus et dolor dapibus, non tempor ex facilisis. Maecenas luctus ipsum et fringilla tempor. Nulla finibus ullamcorper elit, sit amet feugiat est ullamcorper varius. Aliquam non nunc eu leo posuere interdum sit amet at enim. Praesent accumsan mi eu turpis luctus, ac consectetur ligula pretium.',
    value: 5,
    categories: ['Physical', 'Financial'],
    owner: {
        user: userOne._id
    },
    urgency: 'Anytime',
    difficulty: 'Easy'
}

const favourTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Favour two Ana',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem mi, hendrerit sit amet sapien eu, iaculis imperdiet neque. Pellentesque pharetra massa elit, quis sodales magna fringilla in. Aenean dictum nunc eget neque congue aliquam a quis diam. Pellentesque vel vestibulum libero. Etiam non magna eget nunc faucibus eleifend sed mollis magna. Vestibulum dictum purus et dolor dapibus, non tempor ex facilisis. Maecenas luctus ipsum et fringilla tempor. Nulla finibus ullamcorper elit, sit amet feugiat est ullamcorper varius. Aliquam non nunc eu leo posuere interdum sit amet at enim. Praesent accumsan mi eu turpis luctus, ac consectetur ligula pretium.',
    completed: true,
    value: 10,
    categories: ['Social media'],
    owner: {
        user: userTwo._id
    },
    urgency: 'Urgent',
    difficulty: 'Medium'
}

const favourThree = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Favour three Lorena',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem mi, hendrerit sit amet sapien eu, iaculis imperdiet neque. Pellentesque pharetra massa elit, quis sodales magna fringilla in. Aenean dictum nunc eget neque congue aliquam a quis diam. Pellentesque vel vestibulum libero. Etiam non magna eget nunc faucibus eleifend sed mollis magna. Vestibulum dictum purus et dolor dapibus, non tempor ex facilisis. Maecenas luctus ipsum et fringilla tempor. Nulla finibus ullamcorper elit, sit amet feugiat est ullamcorper varius. Aliquam non nunc eu leo posuere interdum sit amet at enim. Praesent accumsan mi eu turpis luctus, ac consectetur ligula pretium.',
    value: 15,
    categories: ['Advice'],
    owner: {
        user: userThree._id
    },
    urgency: 'Within month',
    difficulty: 'Hard'
}

const favourFour = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Favour Four Quim',
    description: 'Description favour Four',
    value: 25,
    categories: ['Small favour'],
    status: 'In progress',
    owner: {
        user: userOne._id
    },
    urgency: 'Anytime',
    difficulty: 'Hard'
}

const favourFive = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Favour Five Ana',
    description: 'Description favour Five',
    value: 50,
    categories: ['Other'],
    owner: {
        user: userTwo._id
    },
    urgency: 'Within week',
    difficulty: 'Easy'
}

const favourSix = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Favour Six Lorena',
    description: 'Description favour Six',
    value: 30,
    categories: ['Small favour', 'Social media'],
    status: 'In progress',
    owner: {
        user: userThree._id
    },
    urgency: 'Urgent',
    difficulty: 'Medium'
}

const favourSeven = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Favour Eight Quim',
    description: 'Description favour Eight',
    value: 20,
    categories: ['Physical'],
    owner: {
        user: userOne._id
    },
    urgency: 'Within week',
    difficulty: 'Hard'
}

const favourEight = {
    _id: new mongoose.Types.ObjectId(),
    title: 'Favour three Lorena',
    description: 'Description favour three',
    value: 10,
    categories: ['Transport'],
    status: 'Completed',
    owner: {
        user: userTwo._id
    },
    urgency: 'Within month',
    difficulty: 'Medium'
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Favour.deleteMany()
    await FavourRequest.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new User(userThree).save()
    await new Favour(favourOne).save()
    await new Favour(favourTwo).save()
    await new Favour(favourThree).save()
    await new Favour(favourFour).save()
    await new Favour(favourFive).save()
    await new Favour(favourSix).save()
    await new Favour(favourSeven).save()
    await new Favour(favourEight).save()
}

module.exports = setupDatabase