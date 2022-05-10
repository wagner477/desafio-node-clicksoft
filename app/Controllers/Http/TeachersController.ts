import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { v4 as uuidv4 } from 'uuid'

import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = request.body()

      const emailExists = await Teacher.findBy('email', body.email)

      if (emailExists) {
        response.status(400)

        return {
          message: 'Email already used!',
        }
      }

      const teacher = await Teacher.create({
        name: body.name,
        email: body.email,
        registration: uuidv4(),
        birth_date: body.birth_date,
      })

      response.status(201)

      return {
        message: 'User created successfully.',
        data: teacher,
      }
    } catch (error) {
      response.status(400)

      console.log(error)

      return {
        error: 'Unexpected error!',
      }
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const teacher = await Teacher.findBy('id', params.id)

      if (!teacher) {
        response.status(400)

        return {
          message: 'Teacher not found!',
        }
      }

      return {
        data: teacher,
      }
    } catch (error) {
      response.status(400)

      return {
        message: 'Unexpected error!',
      }
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body()

      const teacher = await Teacher.findOrFail(params.id)

      if (body.name) {
        teacher.name = body.name
      }

      if (body.email) {
        const emailExists = await Teacher.findBy('email', body.email)

        if (emailExists) {
          response.status(400)

          return {
            message: 'Email already used!',
          }
        }

        teacher.email = body.email
      }

      if (body.birth_date) {
        teacher.birth_date = body.birth_date
      }

      await teacher.save()

      return {
        message: 'Teacher updated successfully',
        data: teacher,
      }
    } catch (error) {
      response.status(400)

      return {
        message: 'Unexpected error!',
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const teacher = await Teacher.findOrFail(params.id)

      await teacher.delete()

      return {
        message: 'Teacher deleted!',
        data: teacher,
      }
    } catch (error) {
      response.status(400)

      return {
        message: 'Unexpected error!',
      }
    }
  }
}
