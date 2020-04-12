import {Request, Response} from "express";

export class Routes {
    public routes(app): void {

        app.route('/xcert')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Xcert GET request successfulll!!!!'
            })
        })

        // Contact
        app.route('/xcert/create')
        // POST endpoint
        .post((req: Request, res: Response) => {
        // Create new xcert
            res.status(200).send({
                message: 'XCERT POST request successfulll!!!!'
            })
        })

        // Contact detail
        app.route('/xcert/:tokenId/transfer')
        // get specific contact
        .put((req: Request, res: Response) => {
        // Update a contact
            res.status(200).send({
                message: 'Update Xcert request successfulll!!!!'
            })
        })

        app.route('/xcert/:tokenId/revoke')
        .delete((req: Request, res: Response) => {
        // Delete a contact
            res.status(200).send({
                message: 'Revoke Xcert request successfulll!!!!'
            })
        })
    }
}