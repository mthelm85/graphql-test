'use strict'
module.exports = (db) => {
  return {
    resolvers: {
      Query: {
        async getCase (root, args) {
        return await db.collection('enforcement_data')
          .find({ $or: [
            { 'case_id': args.id },
            { 'trade_nm': args.trade_nm }
          ]
          },
          { projection: {
            _id: 0,
            'case_id': 1,
            'trade_nm': 1,
            'legal_name': 1,
            'street_addr_1_txt': 1,
            'cty_nm': 1,
            'st_cd': 1,
            'zip_cd': 1 }
          })
          .toArray()
        }
      }
    }
  }
}
