/**
 *
 *
 * @class socialController
 */
class socialController {
  /**
   *
   * @name socialRedirect
   * @static
   * @param {req} req - Request object
   * @param {res} res - Response object
   * @description Redirect
   * @memberof socialController
   * @returns {function} res
   */
  static async socialRedirect(req, res) {
    res.redirect('/api/v1');
  }
}

export default socialController;
