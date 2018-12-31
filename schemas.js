'use strict'
module.exports = (gql) => {
  return {
    typeDefs: gql`
      type Query {
        getCase(
          id: Int,
          trade_nm: String
        ): [Case]
      },
      type Case {
        trade_nm: String,
        legal_name: String,
        street_addr_1_txt: String,
        cty_nm: String,
        st_cd: String,
        zip_cd: Int
      }
    `
  }
}
