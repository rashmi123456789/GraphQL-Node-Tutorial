const GraphQL = require('graphql');
const Department = require('../models/DepartmentModel');
const Employee = require('../models/EmployeeModel');
const Position = require('../models/PositionModel');


const {GraphQLID,GraphQLInt,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLSchema,GraphQLNonNull} = GraphQL;

const EmployeeType = new GraphQLObjectType({
    name:'employer',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        department:{
            type :DepartmentType,
            resolve(parent,args){
                return Department.findById(parent.deptId);
            }
        },
        position:{
            type:PositionType,
            resolve(parent,args){
                return Position.findById(parent.positionId);
            }
        }
    })
})


const DepartmentType = new GraphQLObjectType({
    name:'department',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        tel:{type:GraphQLString},
        employee:{
            type : new GraphQLList(EmployeeType),
            resolve(parent,args){
                return Employee.find({deptId:parent.id});
            }
        }
    })
})

const PositionType = new GraphQLObjectType({
    name:'position',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        salary:{type:GraphQLString},
        employee:{
            type : new GraphQLList(EmployeeType),
            resolve(parent,args){
                return Employee.find({positionId:parent.id});
            }
        }
    })
});

const Mutations= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addEmployee:{
            type:EmployeeType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                deptId:{type:new GraphQLNonNull(GraphQLString)},
                positionId:{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let emp = new Employee({
                    name:args.name,
                    age:args.age,
                    deptId:args.deptId,
                    positionId:args.positionId,
                })

                return emp.save();
            }
        },
        updateEmployee:{
            type:EmployeeType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                deptId:{type:new GraphQLNonNull(GraphQLString)},
                positionId:{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){

                const emp = {
                    name:args.name,
                    age:args.age,
                    deptId:args.deptId,
                    positionId:args.positionId,
                };

                return Employee.findByIdAndUpdate(args.id,emp,{new:true});
               

            }
        },
        addDepartment:{
            type:DepartmentType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                tel:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(paret,args){
                let dept = new Department({
                    name:args.name,
                    tel:args.tel,
                })

                return dept.save();
            }
        },
        addPosition:{
            type:PositionType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                salary:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(paret,args){
                let pos = new Position({
                    name:args.name,
                    salary:args.salary,
                })

                return pos.save();
            }
        }
    }
})

const RootQueryType = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        employer:{
            type: EmployeeType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Employee.findById(args.id);
            }
        },
        department:{
            type: DepartmentType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Department.findById(args.id);
            }
        },
        position:{
            type: PositionType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Position.findById(args.id);
            }
        },
        employee:{
            type: new GraphQLList(EmployeeType),
            resolve(parent,args){
                return Employee.find({});
            }
        },
        departments:{
            type: new GraphQLList(DepartmentType),
            resolve(parent,args){
                return Department.find({});
            }
        },
        positions:{
            type: new GraphQLList(PositionType),
            resolve(parent,args){
                return Position.find({});
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation:Mutations
});



